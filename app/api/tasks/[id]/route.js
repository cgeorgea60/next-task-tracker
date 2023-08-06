import taskModel from "@/models/taskModel";
import { connectToDB } from "@/DB/dbconnection";

// Get a task
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    let result = await taskModel.findById(params.id).populate();
    if (!result) return new Response("Task not found", { status: 404 });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response("Task not found", { status: 500 });
  }
};
// Update a task
export const PUT = async (req, { params }) => {
  const { reminder } = await req.json();
   try {
    await connectToDB();
    const taskToUpdate = await taskModel.findById(params.id);
    if (!taskToUpdate) return new Response("Task not found", { status: 404 });
       taskToUpdate.reminder = reminder;
     await taskToUpdate.save();
    return new Response(JSON.stringify(taskToUpdate), { status: 200 });
   } catch (error) {
    
    return new Response("Failed to update the task", { status: 500 });
  }
};

// Delete a task
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    await taskModel.findByIdAndRemove(params.id);

    return new Response("Task deleted successfully", { status: 200 });
  } catch (error) {
    
    return new Response("An error occured", { status: 500 });
  }
};
