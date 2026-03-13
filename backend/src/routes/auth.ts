import { Elysia, t } from "elysia";
import { prisma } from "../lib/prisma";
import { signToken } from "../middleware/auth";

export const authRoutes = new Elysia({ prefix: "/api/auth" })
  .post("/request-otp", async ({ body }) => {
    const { phone } = body;
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.otpCode.create({ data: { phone, code, expiresAt } });

    // MVP: return code in response for testing (no SMS)
    return { ok: true, code, message: "OTP sent (dev mode: code returned)" };
  }, {
    body: t.Object({ phone: t.String() })
  })

  .post("/verify-otp", async ({ body, set }) => {
    const { phone, code } = body;

    const otp = await prisma.otpCode.findFirst({
      where: { phone, code, used: false, expiresAt: { gte: new Date() } },
      orderBy: { expiresAt: "desc" },
    });

    if (!otp) {
      set.status = 401;
      return { error: "Invalid or expired OTP" };
    }

    await prisma.otpCode.update({ where: { id: otp.id }, data: { used: true } });

    let user = await prisma.user.findUnique({ where: { phone } });
    if (!user) {
      user = await prisma.user.create({ data: { phone } });
    }

    const token = signToken(user.id);
    return { ok: true, token, user };
  }, {
    body: t.Object({ phone: t.String(), code: t.String() })
  });
