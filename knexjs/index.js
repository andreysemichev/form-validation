const knex = require("./dataBase/knex");
const knexPopulate = require("knex-populate");

// SELECT

function select1() {
  knex.raw("select * from todos where id = 1")
    .then(result => {
      const item = result[0];
      console.log(item);
    });
}

function select2() {
  knex("todos") // knex.select().from("todos")
  .where("created_at", ">", new Date('2020-12-22 17:12:52'))
  .where("created_at", "<", new Date('2020-12-25 17:12:52'))
  .then(result => {
    console.log(result);
  });
}

// INSERT

function insert1() {
  const title = "buy fruit";
  const userId = 1;

  knex.raw("insert into todos (title, user_id) values (?, ?)", [title, userId])
    .then(result => {
      const item = result[0];
      console.log(item.insertId);
    });
}

function insert2() {
  const fields = {
    title: "buy fruit",
    user_id: 1
  };


  knex("todos").insert({ ...fields })
    .then(result => {
      console.log(result);
    });
}

function update1() {
  knex.raw("update todos set title = ? where id = ?", ["buy fruit", 6])
    .then(result => {
      const item = result[0].affectedRows;
      console.log(item);
    });
}

// UPDATE

function update2() {
  knex("todos").where("id", 6).update({
    title: "buy fruit"
  })
    .then(result => {
      console.log(result);
    });
}

// DELETE

function delete1() {
  knex.raw("delete from todos where id = ?", 4)
    .then(result => {
      const item = result[0].affectedRows;
      console.log(item);
    });
}

function delete2() {
  knex("todos").where("id", 5).del()
    .then(result => {
      console.log(result);
    });
}

// JOIN

function join1() {
  knex.raw("select * from todos inner join users on todos.user_id = users.id where todos.user_id = ?", 3)
    .then(result => {
      const item = result[0];
      console.log(item);
    });
}

function join2() {
  knex("todos").innerJoin("users", "todos.user_id", "users.id")
  .where("todos.user_id", 3)
    .then(result => {
      console.log(result);
    });
}

// SELECT
// select1();
// select2();

// INSERT
// insert1();
// insert2();

// UPDATE
// update1();
// update2();

// DELETE
// delete1();
// delete2();

// JOIN
// join1();
// join2();

// knex-populate
knexPopulate(knex, "users")
  .populate("todos", "user_id")
  .exec()
  .then(result => {
    console.log(result);
  });
