console.log("tasks/index.js has been loaded!");

const handleTaskAdd = ({ name, overview }) => {
  const newTask = {
    name,
    overview,
    date: new Date().toLocaleDateString("ja-JP"),
    status: "pending",
  };
  setTasks([...tasks, newTask]);
};

const handleTaskStatusChange = (index) => {
  const newTasks = [...tasks];
  newTasks[index].status =
    newTasks[index].status === "completed" ? "pending" : "completed";
  setTasks(newTasks);
};

let is_mail = true

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".mail-or-id");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      console.log(event);
      console.log(is_mail);
      const type = button.value; // data-type 属性を取得
      is_mail = type === "e-mail";
      console.log(`is_mail: ${is_mail}`);
    });
  });
});