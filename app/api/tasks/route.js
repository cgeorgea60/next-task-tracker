import taskModel from "@/models/taskModel";
import { connectToDB } from "@/DB/dbconnection";

//create Task
export const POST = async (req) => {
  const { text, day, reminder } = await req.json();

  try {
    await connectToDB();

    const newTask = new taskModel({
      text: text,
      day: day,
      reminder: reminder,
    });
    const Task = await newTask.save();

    if (Task) {
      return new Response(JSON.stringify(Task), {
        data: Task,
        message: `New task ${text} created`,
        status: 201,
      });
    } else {
      return new Response("Invalid task data received", { status: 400 });
    }
  } catch (error) {
    return new Response("Failed to create new Task", { status: 500 });
  }
};

// Get all tasks

export const GET = async (req) => {
  try {
    await connectToDB();

    const tasks = await taskModel.find({}).populate();
 
    if (!tasks.length) {
      return new Response("No tasks found", { status: 400 });
    }

    return new Response(JSON.stringify(tasks), { status: 201 });
  } catch (error) {
    return new Response(
      "There was an error fetching task",
      { status: 500 },
      error
    );
  }
};
