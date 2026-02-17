const pool = require('../config/db');

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = await pool.query(
    'INSERT INTO tasks(title,description,user_id) VALUES($1,$2,$3) RETURNING *',
    [title, description, req.user.id]
  );
  res.status(201).json(task.rows[0]);
};

exports.getTasks = async (req, res) => {
  const tasks = await pool.query('SELECT * FROM tasks WHERE user_id=$1', [req.user.id]);
  res.json(tasks.rows);
};

exports.deleteTask = async (req, res) => {
  await pool.query('DELETE FROM tasks WHERE id=$1 AND user_id=$2',
    [req.params.id, req.user.id]);
  res.json({ message: "Task deleted" });
};