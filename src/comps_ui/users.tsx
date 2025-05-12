import pool from "@/lib/db";

export async function Users() {
  const users = await getUsers();
  return (
    <div>
      {users.map((u: any) => (
        <h1 key={u.id}>{u.name}</h1>
      ))}
    </div>
  );
}

export async function getUsers() {
  const users = await pool.query("SELECT * FROM users");
  return users.rows;
}
