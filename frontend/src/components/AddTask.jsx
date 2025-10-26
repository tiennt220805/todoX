import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";

const AddTask = ({ handleAddNewTask }) => {
  const [newTask, setNewTask] = useState("");

  const addTask = async () => {
    if (newTask.trim()) {
      try {
        await api.post("/tasks", {
          title: newTask,
        });
        toast.success("Thêm nhiệm vụ thành công !");
        handleAddNewTask();
      } catch (error) {
        console.error("Có lỗi khi thêm nhiệm vụ mới !!!");
        toast.error("Thêm nhiệm vụ thất bại !");
      }

      setNewTask("");
    } else {
      toast.error("Bạn cần nhập nội dung của nhiệm vụ");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="Cần phải làm gì?"
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          onChange={(event) => {
            setNewTask(event.target.value);
          }}
          onKeyPress={handleKeyPress}
        />

        <Button
          variant="gradient"
          size="xl"
          className="px-6"
          onClick={addTask}
          disabled={!newTask.trim()}
        >
          <Plus className="size-5" />
          Thêm
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
