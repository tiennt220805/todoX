import DataTimeFilter from "@/components/DataTimeFilter";
import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import Footer from "@/components/Footer";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { visibleTasksLimit } from "@/lib/data";

const HomePage = () => {
  const [tasksBuffer, setTasksBuffer] = useState([]);
  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [completeTasksCount, setCompleteTasksCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  //when user changes filter or date range, go back to first page
  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);

  const fetchTasks = async () => {
    try {
      // const res = await fetch("http://localhost:5001/api/tasks");
      // const data = await res.json();
      // setTasksBuffer(data);
      const res = await api.get(`/tasks/?filter=${dateQuery}`);
      setTasksBuffer(res.data.tasks);
      setActiveTasksCount(res.data.activeTasksCount);
      setCompleteTasksCount(res.data.completeTasksCount);
    } catch (error) {
      console.log("Lỗi xảy ra khi truy xuất tasks: ", error);
      toast.error("Lỗi xảy ra khi truy xuất tasks.");
    }
  };

  const filteredList = tasksBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "complete";
      default:
        return true;
    }
  });

  const handleTasksChanged = () => {
    fetchTasks();
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const visibleTasks = filteredList.slice(
    (page - 1) * visibleTasksLimit,
    page * visibleTasksLimit
  );

  if (visibleTasks.length === 0) {
    handlePrevPage();
  }

  const totalPages = Math.ceil(filteredList.length / visibleTasksLimit);

  return (
    <div className="min-h-screen w-full bg-[#fefcff] relative">
      {/* Dreamy Sky Pink Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />
      {/* Your Content/Components */}
      <div className="container pt-8 m-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/* Phần đầu trang */}
          <Header />

          {/* Phần thêm task */}
          <AddTask handleAddNewTask={handleTasksChanged} />

          {/* Phần thống kê vào lọc tasks */}
          <StatsAndFilters
            filter={filter}
            setFilter={setFilter}
            activeTasksCount={activeTasksCount}
            completedTasksCount={completeTasksCount}
          />

          {/* Danh sách các task */}
          <TaskList
            filteredTasks={visibleTasks}
            filter={filter}
            handleTasksChanged={handleTasksChanged}
          />

          <div className="flex flex-row justify-between gap-6 sm:flex-row">
            {/* Phân trang */}
            <TaskListPagination
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />

            {/* Lọc tasks theo thời gian */}
            <DataTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>

          {/* Phần footer */}
          <Footer
            activeTasksCount={activeTasksCount}
            completedTasksCount={completeTasksCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
