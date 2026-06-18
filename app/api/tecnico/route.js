import pool from "@/lib/db";
import bcrypt from "bcrypt";
import { temPermissao } from "@/lib/auth";

export async function POST(req) {
  if (!temPermissao(req, "administrador")) {
    return Response.json({ error: "Sem permissão" }, { status: 403 });
  }

  try {
    const { nome, email, senha } = await req.json();

    const senhaHash = await bcrypt.hash(senha, 10);

    const result = await pool.query(
      `INSERT INTO tecnico (nome, email, senha) VALUES ($1,$2,$3) RETURNING *`,
      [nome, email, senhaHash]
    );

    return Response.json(result.rows[0]);
  } catch (error) {
    return Response.json({ error: "Erro ao cadastrar técnico" }, { status: 500 });
  }
}

export async function GET(req) {
  if (!temPermissao(req, "administrador", "tecnico", "atleta")) {
    return Response.json({ error: "Sem permissão" }, { status: 403 });
  }

  const result = await pool.query(`SELECT * FROM tecnico ORDER BY id DESC`);
  return Response.json(result.rows);
}

export async function PUT(req) {
  if (!temPermissao(req, "administrador")) {
    return Response.json({ error: "Sem permissão" }, { status: 403 });
  }

  try {
    const { id, nome, email } = await req.json();

    const result = await pool.query(
      `UPDATE tecnico SET nome=$1, email=$2 WHERE id=$3 RETURNING *`,
      [nome, email, id]
    );

    return Response.json(result.rows[0]);
  } catch (error) {
    return Response.json({ error: "Erro ao atualizar técnico" }, { status: 500 });
  }
}

export async function DELETE(req) {
  if (!temPermissao(req, "administrador")) {
    return Response.json({ error: "Sem permissão" }, { status: 403 });
  }

  try {
    const { id } = await req.json();
    await pool.query(`DELETE FROM tecnico WHERE id=$1`, [id]);
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: "Erro ao excluir técnico" }, { status: 500 });
  }
}