function MainComponent({
    onTaskAdd,
    tasks,
    onTaskStatusChange,
    guests,
    onGuestInvite,
    onProjectUpdate,
    projectTitle = "project tacos party",
    projectOverview = "MAFはタコスが食べたくて仕方ないようです。このプロジェクトはタコスパーティーを開くためのプロジェクト管理画面です。",
  }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [taskOverview, setTaskOverview] = useState("");
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteUserId, setInviteUserId] = useState("");
    const [inviteType, setInviteType] = useState("email");
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(projectTitle);
    const [editedOverview, setEditedOverview] = useState(projectOverview);
  
    const getStatusBadgeColor = (status) => {
      switch (status) {
        case "in_progress":
          return "bg-yellow-500";
        case "completed":
          return "bg-green-500";
        default:
          return "bg-gray-500";
      }
    };
  
    const getStatusText = (status) => {
      switch (status) {
        case "in_progress":
          return "進行中";
        case "completed":
          return "完了";
        default:
          return "未着手";
      }
    };
  
    const handleSubmit = () => {
      onTaskAdd({ name: taskName, overview: taskOverview });
      setTaskName("");
      setTaskOverview("");
      setIsModalOpen(false);
    };
  
    const handleInvite = () => {
      const inviteValue = inviteType === "email" ? inviteEmail : inviteUserId;
      onGuestInvite({ type: inviteType, value: inviteValue });
      setInviteEmail("");
      setInviteUserId("");
      setIsInviteModalOpen(false);
    };
  
    const handleSave = () => {
      onProjectUpdate({ title: editedTitle, overview: editedOverview });
      setIsEditing(false);
    };
  
    return (
      <div className="flex h-screen bg-[#1a1a1a]">
        <div className="w-64 bg-[#2d2d2d] p-4">
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 rounded-full bg-gray-500 mr-2"></div>
            <div className="text-white font-roboto">user_name</div>
          </div>
  
          <nav className="space-y-2">
            <div className="text-white bg-[#333333] cursor-pointer p-2 rounded">
              <div className="flex justify-between items-center">
                <div>
                  <i className="fas fa-folder mr-2"></i>
                  Projects
                </div>
                <div className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  2
                </div>
              </div>
              <div className="ml-4 mt-2 text-sm">
                <div className="flex justify-between items-center">
                  <div>project tacos party</div>
                  <div className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    1
                  </div>
                </div>
                <div className="text-gray-400">project pina colada</div>
              </div>
            </div>
  
            <div className="text-gray-400 hover:text-white cursor-pointer p-2 rounded hover:bg-[#363636]">
              <div className="flex justify-between items-center">
                <div>
                  <i className="fas fa-tasks mr-2"></i>
                  Work Packages
                </div>
                <div className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  3
                </div>
              </div>
            </div>
  
            <div className="text-gray-400 hover:text-white cursor-pointer p-2 rounded hover:bg-[#363636]">
              <div className="flex justify-between items-center">
                <div>
                  <i className="fas fa-briefcase mr-2"></i>
                  Jobs
                </div>
                <div className="text-xs">no job</div>
              </div>
            </div>
          </nav>
        </div>
  
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="text-white mb-6">
            <div className="flex items-center justify-between mb-4">
              {isEditing ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="text-2xl font-bold bg-[#2d2d2d] px-2 py-1 rounded"
                />
              ) : (
                <h1 className="text-2xl font-bold">{projectTitle}</h1>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => setIsInviteModalOpen(true)}
                  className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
                >
                  <i className="fas fa-user-plus mr-2"></i>
                  ゲストを招待
                </button>
                {isEditing ? (
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
                  >
                    <i className="fas fa-save mr-2"></i>
                    保存
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-gray-400 hover:text-white"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                )}
              </div>
            </div>
            {isEditing ? (
              <textarea
                value={editedOverview}
                onChange={(e) => setEditedOverview(e.target.value)}
                className="w-full bg-[#2d2d2d] text-gray-400 px-2 py-1 rounded"
                rows={3}
              />
            ) : (
              <p className="text-gray-400">{projectOverview}</p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="bg-[#363636] px-3 py-1 rounded-full text-sm">
                making tacos
              </span>
              <span className="bg-[#363636] px-3 py-1 rounded-full text-sm">
                eating tacos
              </span>
              <span className="bg-[#363636] px-3 py-1 rounded-full text-sm">
                enjoying tacos
              </span>
            </div>
          </div>
  
          <div className="text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl">タスク</h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
              >
                タスクを追加
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="bg-[#2d2d2d] p-4 rounded-lg hover:bg-[#363636] transition-colors"
                >
                  <div className="flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs text-white ${getStatusBadgeColor(task.status)}`}
                          >
                            {getStatusText(task.status)}
                          </span>
                          {task.priority && (
                            <span className="text-red-500">
                              <i className="fas fa-flag"></i>
                            </span>
                          )}
                        </div>
                        <h3 className="font-medium text-lg mb-1">{task.name}</h3>
                        <p className="text-gray-400 text-sm mb-2">
                          {task.overview}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-[#404040] pt-3">
                      <div className="text-sm text-gray-400">
                        <i className="far fa-calendar mr-2"></i>
                        {task.date}
                      </div>
                      <button
                        onClick={() => onTaskStatusChange(index)}
                        className="text-sm text-blue-400 hover:text-blue-300"
                      >
                        ステータスを変更
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          <div className="text-white mt-8">
            <h2 className="text-xl mb-4">招待済みゲスト</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guests.map((guest, index) => (
                <div
                  key={index}
                  className="bg-[#2d2d2d] p-4 rounded-lg flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-user"></i>
                      <span>{guest.email || guest.userId}</span>
                    </div>
                    <span
                      className={`text-sm ${
                        guest.status === "accepted"
                          ? "text-green-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {guest.status === "accepted" ? "参加確定" : "保留中"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#2d2d2d] p-6 rounded-lg w-[500px]">
              <h3 className="text-white text-xl mb-4">新しいタスク</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-2">タスク名</label>
                  <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    className="w-full bg-[#1a1a1a] text-white px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">概要</label>
                  <textarea
                    value={taskOverview}
                    onChange={(e) => setTaskOverview(e.target.value)}
                    className="w-full bg-[#1a1a1a] text-white px-3 py-2 rounded h-32"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white"
                  >
                    キャンセル
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 text-white"
                  >
                    追加
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
  
        {isInviteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#2d2d2d] p-6 rounded-lg w-[500px]">
              <h3 className="text-white text-xl mb-4">ゲストを招待</h3>
              <div className="space-y-4">
                <div className="flex gap-4 mb-4">
                  <button
                    onClick={() => setInviteType("email")}
                    className={`px-4 py-2 rounded ${
                      inviteType === "email"
                        ? "bg-blue-500 text-white"
                        : "bg-[#1a1a1a] text-gray-400"
                    }`}
                  >
                    メールアドレス
                  </button>
                  <button
                    onClick={() => setInviteType("userId")}
                    className={`px-4 py-2 rounded ${
                      inviteType === "userId"
                        ? "bg-blue-500 text-white"
                        : "bg-[#1a1a1a] text-gray-400"
                    }`}
                  >
                    ユーザーID
                  </button>
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">
                    {inviteType === "email" ? "メールアドレス" : "ユーザーID"}
                  </label>
                  <input
                    type={inviteType === "email" ? "email" : "text"}
                    value={inviteType === "email" ? inviteEmail : inviteUserId}
                    onChange={(e) =>
                      inviteType === "email"
                        ? setInviteEmail(e.target.value)
                        : setInviteUserId(e.target.value)
                    }
                    className="w-full bg-[#1a1a1a] text-white px-3 py-2 rounded"
                    placeholder={
                      inviteType === "email"
                        ? "example@email.com"
                        : "ユーザーIDを入力"
                    }
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsInviteModalOpen(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white"
                  >
                    キャンセル
                  </button>
                  <button
                    onClick={handleInvite}
                    className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 text-white"
                  >
                    招待する
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  function StoryComponent() {
    const [tasks, setTasks] = useState([
      {
        name: "タコスの具材を買う",
        overview: "スーパーで買い物をする",
        date: "2024/01/24",
        status: "in_progress",
        priority: true,
      },
      {
        name: "トルティーヤを準備する",
        overview: "手作りで作る",
        date: "2024/01/24",
        status: "completed",
        priority: false,
      },
      {
        name: "サルサソースを作る",
        overview: "辛めに作る",
        date: "2024/01/25",
        status: "pending",
        priority: true,
      },
      {
        name: "飲み物を用意する",
        overview: "ビールとテキーラを購入",
        date: "2024/01/25",
        status: "pending",
        priority: false,
      },
    ]);
  
    const [guests, setGuests] = useState([
      { email: "friend1@example.com", status: "accepted" },
      { email: "friend2@example.com", status: "pending" },
    ]);
  
    const [projectData, setProjectData] = useState({
      title: "project tacos party",
      overview:
        "MAFはタコスが食べたくて仕方ないようです。このプロジェクトはタコスパーティーを開くためのプロジェクト管理画面です。",
    });
  
    const handleTaskAdd = ({ name, overview }) => {
      const newTask = {
        name,
        overview,
        date: new Date().toLocaleDateString("ja-JP"),
        status: "pending",
        priority: false,
      };
      setTasks([...tasks, newTask]);
    };
  
    const handleTaskStatusChange = (index) => {
      const newTasks = [...tasks];
      const currentStatus = newTasks[index].status;
      if (currentStatus === "pending") {
        newTasks[index].status = "in_progress";
      } else if (currentStatus === "in_progress") {
        newTasks[index].status = "completed";
      } else {
        newTasks[index].status = "pending";
      }
      setTasks(newTasks);
    };
  
    const handleGuestInvite = ({ type, value }) => {
      setGuests([
        ...guests,
        { [type === "email" ? "email" : "userId"]: value, status: "pending" },
      ]);
    };
  
    const handleProjectUpdate = ({ title, overview }) => {
      setProjectData({ title, overview });
    };
  
    return (
      <MainComponent
        tasks={tasks}
        onTaskAdd={handleTaskAdd}
        onTaskStatusChange={handleTaskStatusChange}
        guests={guests}
        onGuestInvite={handleGuestInvite}
        onProjectUpdate={handleProjectUpdate}
        projectTitle={projectData.title}
        projectOverview={projectData.overview}
      />
    );
  }
  
  
  