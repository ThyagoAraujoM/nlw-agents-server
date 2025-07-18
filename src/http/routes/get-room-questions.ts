import { desc, eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";

export const getRoomQuestions: FastifyPluginCallbackZod = (app) => {
  app.get(
    "/rooms/:roomId/questions",
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    async (request) => {
      const { roomId } = request.params;

      const result = await db
        .select({
          id: schema.quenstions.id,
          question: schema.quenstions.question,
          answer: schema.quenstions.answer,
          createAt: schema.quenstions.createAt,
        })
        .from(schema.quenstions)
        .where(eq(schema.quenstions.roomId, roomId))
        .orderBy(desc(schema.quenstions.createAt));

      return result;
    }
  );
};
