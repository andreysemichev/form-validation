
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users").del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, name: "Ellyn Treen", email: "jidle4@disqus.com" },
        { id: 2, name: "Rocky Leacy", email: "edunridgec@naver.com" },
        { id: 3, name: "Molli Stowte", email: "narghentd@yellowpages.com" },
      ]);
    });
};