import { useState } from "react";

const C = {
  bg: "#080808", card: "#0e0e0e", border: "#1c1c1c",
  text: "#cccccc", muted: "#555", dim: "#333",
  red: "#E05A3A", gold: "#C4A35A", blue: "#5A9EC4",
  green: "#5AC47A", purple: "#9A5AC4", teal: "#5AC4B4",
  pink: "#D96A9F",
};

const PHASES = [
  { id: 1, label: "Phase 1", range: "第1–6周",   title: "机器人学启航", color: C.red,    deadline: "5月底：SE(3)+IK+PyTorch 破冰" },
  { id: 2, label: "Phase 2", range: "第7–12周",  title: "真机+Transformer", color: C.gold, deadline: "7月初：真机控制循环+手写Transformer" },
  { id: 3, label: "Phase 3", range: "第13–24周", title: "模仿学习+入学", color: C.green,  deadline: "10月初：ACT/DP 跑通+入学稳定" },
  { id: 4, label: "Phase 4", range: "第25–36周", title: "VLA 专精",     color: C.blue,   deadline: "1月初：真机 VLA 部署 (项目 #2)" },
  { id: 5, label: "Phase 5", range: "第37–48周", title: "拳头项目+前沿", color: C.purple, deadline: "3月初：项目 #3 + 研究能力深化" },
  { id: 6, label: "Phase 6", range: "第49–60周", title: "求职冲刺",     color: C.teal,   deadline: "6月底：offer + 研二规划" },
];

const WEEKS = [
  // ═════════════════ PHASE 1 · 机器人学启航 (W1-6) ═════════════════
  {
    week: 1, phase: 1,
    title: "启动周 · 环境+SE(3)破冰",
    overview: "搭建完整学习基础设施，机器人学从最基础的 SE(3) 群开始",
    tracks: [
      { name: "A · 机器人学", hours: 7, color: C.red, items: [
        "3Blue1Brown 线代第 1-5 集（唤醒数学直觉，重点：向量空间、线性变换）",
        "Modern Robotics Ch3.1-3.2：SE(3)、SO(3) 的定义和性质",
        "齐次变换矩阵 T ∈ SE(3)：R(3×3) + p(3×1) 的统一表示，手推 3 个例子",
      ]},
      { name: "B · ML/工具", hours: 5, color: C.blue, items: [
        "uv 环境 + PyTorch + wandb 全套装好，cuda.is_available() == True",
        "d2l.ai 第 1-2 章（预备知识 + 线性回归），敲代码不跳过",
        "GitHub 个人仓库 embodied-ai-learning 建立，贴 v5 路线图作 README",
      ]},
      { name: "C · 习惯建立", hours: 2, color: C.gold, items: [
        "work_log.md 每日更新：今天做了什么、卡在哪、明天计划",
        "Linux/git/vim/tmux 基础命令熟练（有不会的查一查即可）",
        "每日泛读 1-2 篇 arxiv 摘要，建立领域感",
      ]},
    ],
    internship: "继续配合主从臂和灵巧手调试。关键思维：每次遇到坐标系问题，对应到 SE(3) 概念上；每次 IK 调参失败，记录具体表现（误差、振荡、发散），下周学 Jacobian 时回头分析",
    embodied: "具身智能最基础的命题：让机器人理解自己在三维空间中的位置和姿态。SE(3) 是所有后续机器人学、VLA action 表示、机器人感知的数学根基。你本周建立的不仅是工具链，更是做具身研究的基本思维——理论（空间几何）、工具（代码）、硬件（真机）三位一体。",
    milestone: "PyTorch cuda 跑通；能用自己的话解释 SE(3) 和齐次变换；GitHub +5 commits；work_log 连续 5 天",
    resources: ["3Blue1Brown 线性代数的本质（B 站）", "Modern Robotics Ch3 免费 PDF", "d2l.ai 中文版 zh.d2l.ai"],
  },
  {
    week: 2, phase: 1,
    title: "旋转表示四兄弟 + MLP",
    overview: "旋转的四种表示吃透（欧拉角/旋转矩阵/四元数/轴角），ML 进入 PyTorch 实战",
    tracks: [
      { name: "A · 机器人学", hours: 7, color: C.red, items: [
        "欧拉角（直觉但有奇异）、旋转矩阵（计算但冗余）、四元数（紧凑无奇异）、轴角（物理直观）对比",
        "四种表示的互转公式，在代码里实现并测试（scipy.spatial.transform 验证）",
        "Modern Robotics Ch3.3：exp/log 映射（李代数 so(3) ↔ SO(3)）",
      ]},
      { name: "B · ML/PyTorch", hours: 5, color: C.blue, items: [
        "d2l.ai 第 3 章：多层感知机，理解反向传播",
        "手写 MLP（numpy 版）训练 MNIST 到 95%+",
        "同样任务用 PyTorch nn.Module 重写，对比差异",
      ]},
      { name: "C · 数学+论文", hours: 2, color: C.gold, items: [
        "3B1B 线代第 7-9 集：行列式、逆矩阵、列空间/零空间",
        "开始每周 1 篇精读：ResNet（He et al. 2015）",
      ]},
    ],
    internship: "主从臂调试时，你会反复接触到坐标系变换。挑一个具体场景（比如主臂末端位姿 → 从臂目标位姿），亲手推一遍 T_master_to_slave 的矩阵表达",
    embodied: "旋转表示是具身智能中最容易被低估的基础。VLA 模型输出的 action 里包含位姿预测，如何表示旋转直接影响学习效果——四元数因为没有奇异点和低维度，是大多数 VLA 的默认选择。你理解了这些，后续改 VLA action head 时不会踩坑。",
    milestone: "代码实现四种旋转表示互转，误差 <1e-6；MLP numpy 版 MNIST >95%；精读 ResNet 论文有笔记",
    resources: ["scipy.spatial.transform.Rotation 文档", "Modern Robotics Ch3.3", "ResNet 原论文 arxiv.org/abs/1512.03385"],
  },
  {
    week: 3, phase: 1,
    title: "FK 推导 + pinocchio + PyTorch 自动求导",
    overview: "机器人学进入 Forward Kinematics 实战，ML 吃透 autograd",
    tracks: [
      { name: "A · 机器人学", hours: 7, color: C.red, items: [
        "DH 参数约定：a, d, α, θ 如何描述相邻关节关系",
        "Forward Kinematics 推导 T_0^n = ∏ T_i^(i+1)，手推 A7Lite 前 3 个关节",
        "pinocchio 安装，加载 URDF，调用 forwardKinematics API",
      ]},
      { name: "B · ML/PyTorch", hours: 5, color: C.blue, items: [
        "PyTorch autograd 深入：计算图、grad_fn、梯度流",
        "Karpathy micrograd（YouTube 视频 + 代码）",
        "手写一个 2 层网络（不用 nn.Module），用 autograd 训练",
      ]},
      { name: "C · 数学+论文", hours: 2, color: C.gold, items: [
        "3B1B 线代第 10-14 集：特征值、特征向量、对角化",
        "精读 Attention Is All You Need（Transformer 原论文）",
      ]},
    ],
    internship: "用 pinocchio 加载 A7Lite URDF，输入任意关节角（比如 [0.1, 0.2, ...]），打印末端位姿。再让公司现有系统输出同样状态，对比结果是否一致（误差 <1e-6）",
    embodied: "FK 是机器人「知道自己在哪」的能力，是所有操作任务的前置条件。VLA 模型的 proprioception 输入里，关节角和末端位姿是核心——你能用 FK 从关节角算末端位姿，也就理解了 proprioception embedding 的物理意义。",
    milestone: "pinocchio 加载 A7Lite URDF 成功，FK 结果与真机状态一致（误差 <1e-6）；能讲清楚 autograd 原理；精读 Transformer 论文",
    resources: ["Pinocchio tutorial gepettoweb.laas.fr", "Karpathy micrograd github.com/karpathy/micrograd", "Attention Is All You Need"],
  },
  {
    week: 4, phase: 1,
    title: "Jacobian + CNN 入门 + 概率复建",
    overview: "Jacobian 理论建立，CNN 开始动手，补概率",
    tracks: [
      { name: "A · 机器人学", hours: 6, color: C.red, items: [
        "Jacobian 矩阵 J(q) ∈ ℝ^(6×n)：ẋ = J(q)·q̇ 的物理含义",
        "Jacobian 求解方法：解析解 vs 数值解",
        "用 pinocchio 的 computeJointJacobians 算 A7Lite 在不同姿态的 J，观察 J 的秩",
      ]},
      { name: "B · ML/CNN", hours: 6, color: C.blue, items: [
        "d2l.ai 第 6 章：卷积神经网络基础",
        "LeNet 实现，在 MNIST 上训练",
        "理解卷积/池化/padding 的机制",
      ]},
      { name: "C · 数学", hours: 2, color: C.gold, items: [
        "概率复建：条件概率、贝叶斯公式、全概率",
        "多元高斯分布的均值/协方差/PDF",
      ]},
      { name: "D · 论文", hours: 1, color: C.purple, items: [
        "精读 ViT（Vision Transformer）",
      ]},
    ],
    internship: "结合 Jacobian 理论分析主从臂遥操中的问题：比如操作者快速移动手臂时，从臂跟不上，是 IK 发散还是 J 奇异？能不能在代码里加条件数监控？",
    embodied: "Jacobian 连接了关节空间和任务空间，是 IK 的数学基础，也是 VLA 研究中「从预测末端位姿到执行关节指令」这一步的理论根据。没有 Jacobian，机器人就只能在关节空间盲目动作，做不了面向任务的精细操作。",
    milestone: "能手推 Jacobian 的定义；LeNet MNIST 99%+；精读 ViT；理解条件概率和多元高斯",
    resources: ["Modern Robotics Ch5 Velocity Kinematics", "d2l.ai Ch6", "ViT arxiv.org/abs/2010.11929"],
  },
  {
    week: 5, phase: 1,
    title: "数值 IK 实现 + CIFAR-10",
    overview: "把 Jacobian 用起来，写一个真正的 IK 求解器；ML 进入 CNN 正式训练",
    tracks: [
      { name: "A · 机器人学", hours: 7, color: C.red, items: [
        "IK 数值解：伪逆法 q̇ = J⁺·ẋ（最小二乘）",
        "阻尼最小二乘 DLS：(J^T·J + λI)^(-1)·J^T·ẋ，理解 λ 作用",
        "用 pinocchio + Pink 库实现 A7Lite 的数值 IK，测 100 次随机目标",
      ]},
      { name: "B · ML/CNN", hours: 6, color: C.blue, items: [
        "CIFAR-10 数据集上训 CNN，目标准确率 >85%",
        "学习常用数据增强：RandomCrop、HorizontalFlip、ColorJitter",
        "对比不同优化器：SGD vs Adam vs AdamW",
      ]},
      { name: "C · 论文", hours: 2, color: C.purple, items: [
        "精读 CLIP：图文对比学习，现代 VLA 的语言基座",
      ]},
    ],
    internship: "你写的 IK 在 A7Lite 真机上跑（先仿真验证再上真机）。记录：成功率、平均迭代次数、单次耗时。这些是 IK 性能指标，面试可能被问",
    embodied: "IK 是遥操作的心脏——操作者移动主臂，系统必须在 10ms 内算出从臂的关节目标。你亲手写一个 IK 求解器，比看 100 篇论文更让你理解遥操系统为什么有些时候会「卡」「抖」「跟不上」。",
    milestone: "A7Lite 数值 IK 成功率 >95%，单次 <5ms；CIFAR-10 >85%；精读 CLIP",
    resources: ["Pink 库 stack-of-tasks/pink", "Modern Robotics Ch6", "CLIP 论文"],
  },
  {
    week: 6, phase: 1,
    title: "IK 进阶 + ViT 实现 + Phase 1 收尾",
    overview: "IK 处理奇异点和工作空间边界；ML 实现 ViT；准备进入 Phase 2",
    tracks: [
      { name: "A · 机器人学", hours: 6, color: C.red, items: [
        "奇异构型分析：det(J)=0 的几何意义",
        "工作空间可达性：给 A7Lite 做一个可达性检查函数",
        "IK 边界处理：目标超出工作空间时的策略（clip 到最近可达点）",
      ]},
      { name: "B · ML", hours: 6, color: C.blue, items: [
        "ViT 代码实现：patch embedding + transformer encoder + classification head",
        "用 timm 库加载预训练 ViT，在 CIFAR-10 做迁移学习",
        "可视化 Attention 热力图，理解 ViT「看」的区域",
      ]},
      { name: "C · 论文+复盘", hours: 2, color: C.purple, items: [
        "精读 DINOv2：具身智能最常用的视觉 backbone",
        "Phase 1 复盘：写一份 Phase 1 总结到 GitHub（500 字）",
      ]},
    ],
    internship: "把你这 6 周学的机器人学做一个整理：能不能为公司写一个「机器人学基础 note」文档？这不仅巩固自己，也给其他实习生留下知识资产（如公司允许）",
    embodied: "Phase 1 结束时，你应该具备了具身研究者的「机器人学基础素养」——SE(3)、FK、IK、Jacobian 这些在任何具身智能论文的「System Setup」章节都会出现。你能看懂就说明你过了基础关。",
    milestone: "IK 处理奇异+边界完整；ViT 实现并在 CIFAR-10 迁移成功；Phase 1 总结文档发布",
    resources: ["DINOv2 论文", "timm 库", "工作空间分析工具 pybullet"],
  },

  // ═════════════════ PHASE 2 · 真机+Transformer (W7-12) ═════════════════
  {
    week: 7, phase: 2,
    title: "ROS2 启航 + ResNet 实战",
    overview: "ROS2 是具身系统的基础设施，必须掌握；ML 进入 ResNet 实战",
    tracks: [
      { name: "A · ROS2", hours: 7, color: C.red, items: [
        "ROS2 Humble 安装，跑通 Talker/Listener 官方 demo",
        "Topic（异步发布订阅）vs Service（同步请求响应）vs Action（长时任务）",
        "写第一个 Publisher：10Hz 发布 A7Lite 关节目标到 /joint_cmd",
      ]},
      { name: "B · ML", hours: 5, color: C.blue, items: [
        "ResNet-18 实现，CIFAR-10 目标 90%+",
        "理解残差连接如何解决深层网络梯度消失",
        "学习 torch.utils.data.DataLoader 使用",
      ]},
      { name: "C · 论文+数学", hours: 2, color: C.purple, items: [
        "精读：Dex-Pilot（ICRA 2020）——遥操作经典",
        "学习 KL divergence 的定义和性质",
      ]},
    ],
    internship: "主从臂可能已经有 ROS2 架构。仔细读懂公司现有 ROS2 工程的结构：有哪些 node、topic、service？画一张 rqt_graph 图贴在 work_log 里",
    embodied: "ROS2 是具身智能的「神经网络」——感知模块（相机）、决策模块（VLA）、控制模块（力控）各自独立运行，通过 ROS2 交换数据。不会写节点，就无法把各模块串成一个完整系统。这是一个工程岗必考项。",
    milestone: "ROS2 Publisher/Subscriber 能独立写；ResNet-18 CIFAR-10 >90%；精读 Dex-Pilot",
    resources: ["ROS2 Humble 官方 tutorial", "赵虚左《ROS2 机器人编程》B 站", "Dex-Pilot 论文"],
  },
  {
    week: 8, phase: 2,
    title: "ROS2 Service/Action + Transformer 启动",
    overview: "ROS2 深化到能写复杂交互逻辑；Transformer 进入实战",
    tracks: [
      { name: "A · ROS2+集成", hours: 6, color: C.red, items: [
        "写 ROS2 Service：接收末端目标位姿 → 调用 IK → 返回关节角",
        "rqt_graph 可视化你的节点通信",
        "ROS2 与 pinocchio 集成：让 pinocchio 作为 IK 后端服务",
      ]},
      { name: "B · Transformer", hours: 7, color: C.blue, items: [
        "Karpathy 《Zero to Hero》makemore 系列，理解 character-level LM",
        "从 0 开始写 self-attention（50 行内，不用 nn.MultiheadAttention）",
        "验证：手写版与官方实现输出误差 <1e-5",
      ]},
      { name: "C · 论文", hours: 2, color: C.purple, items: [
        "精读 AnyTeleop（ICLR 2024）——跨手型遥操方案",
      ]},
    ],
    internship: "把你的 IK service 集成到公司遥操栈里作为一个可选后端。这是你给公司的第一个有工程价值的 PR（如果需要）",
    embodied: "Transformer 是当今 VLA 的基础架构——π0、OpenVLA、GR00T 都是 Transformer。能手写 Self-Attention，就有了改 VLA 代码的「手术执照」。后续做多模态融合时，你知道在哪里插 cross-attention、梯度怎么流。",
    milestone: "ROS2 Service/Action 能写；手写 Self-Attention 与官方误差 <1e-5；精读 AnyTeleop",
    resources: ["nanoGPT github.com/karpathy/nanoGPT", "The Illustrated Transformer", "AnyTeleop 论文"],
  },
  {
    week: 9, phase: 2,
    title: "A7Lite 真机控制循环 + minGPT",
    overview: "闭环：真机能接收 ROS2 指令运动；训一个 minGPT",
    tracks: [
      { name: "A · 真机控制", hours: 6, color: C.red, items: [
        "封装 A7Lite SDK 为完整 ROS2 driver，支持位置模式",
        "实现软件急停（Ctrl+C 立即锁定）和关节限位检查",
        "测量指令到反馈的往返延迟，目标 <5ms",
      ]},
      { name: "B · Transformer", hours: 7, color: C.blue, items: [
        "完整实现 minGPT（约 300 行），包含 multi-head attention",
        "在莎士比亚字符数据上训练，生成合理文本",
        "用 wandb 记录训练曲线",
      ]},
      { name: "C · 论文", hours: 2, color: C.purple, items: [
        "精读 DDPM（扩散模型奠基）",
      ]},
    ],
    internship: "如果公司已有 A7Lite driver，读懂它的实现并对比自己写的版本，记录差异。这是工程学习的好时机——看生产级代码如何处理异常、日志、配置",
    embodied: "真机控制循环是具身智能系统的基石。没有稳定的控制循环，再聪明的 VLA 也无法执行。你从第 9 周就在真机上调控制循环，后续做 VLA 部署时不会被「我的模型明明对的，为什么真机不工作」困住。",
    milestone: "A7Lite 真机能接收 ROS2 指令做关节运动；minGPT 生成合理文本；精读 DDPM",
    resources: ["minGPT github.com/karpathy/minGPT", "DDPM arxiv.org/abs/2006.11239"],
  },
  {
    week: 10, phase: 2,
    title: "Pose Retargeting 基础 + DDIM",
    overview: "Retargeting 开始接触（人手→机械臂）；扩散模型进入 DDIM",
    tracks: [
      { name: "A · Retargeting", hours: 6, color: C.red, items: [
        "MediaPipe 读取人手 21 个关键点",
        "人手 kinematic 树 vs L20 Lite kinematic 树的异构性",
        "末端位姿映射方案 A：人手腕部位姿 → A7Lite 末端 IK 求解",
      ]},
      { name: "B · 扩散模型", hours: 7, color: C.blue, items: [
        "DDIM 加速采样（10 步替代 1000 步的原理）",
        "用 HuggingFace diffusers 库训一个小扩散模型（MNIST 图像生成）",
        "采样步数对生成质量的影响（可视化对比）",
      ]},
      { name: "C · 论文", hours: 2, color: C.purple, items: [
        "精读：Flow Matching for Generative Modeling（π0 基础）",
      ]},
    ],
    internship: "Pose retargeting 是公司核心需求之一，你控制背景对几何映射天然敏感——主动跟 mentor 表达想深入这块的意愿。如果有 owned 任务，更好",
    embodied: "Retargeting 连接人类演示和机器人执行——是数据飞轮的起点。好的 retargeting → 好的遥操体验 → 好的演示数据 → 好的 VLA 性能。这是你从机器人组延伸到 VLA 组的天然桥梁。",
    milestone: "MediaPipe → A7Lite 的基础 retargeting 跑通；扩散模型 MNIST 生成；精读 Flow Matching",
    resources: ["MediaPipe Hand Tracking", "HuggingFace diffusers", "Flow Matching 论文"],
  },
  {
    week: 11, phase: 2,
    title: "阻抗控制 Pybullet 仿真 + CV 收尾",
    overview: "阻抗控制（你的优势区）从仿真验证开始；ML 的 CV 基础收尾",
    tracks: [
      { name: "A · 阻抗控制", hours: 6, color: C.red, items: [
        "阻抗控制模型 M·ẍ + D·ẋ + K·x = F_ext 推导",
        "Pybullet 仿真：实现笛卡尔空间阻抗，末端像弹簧被推动",
        "参数实验：K/D 调节对响应的影响，理解刚度的物理感受",
      ]},
      { name: "B · ML 整合", hours: 6, color: C.blue, items: [
        "HuggingFace transformers 库使用进阶（from_pretrained、generate）",
        "做一个简单 CV 项目：用预训练 ViT + LoRA 做图像分类",
        "wandb 记录实验，学会用 wandb 对比多个 run",
      ]},
      { name: "C · 论文", hours: 2, color: C.purple, items: [
        "精读 HOMER 或其他人手→机械手 retargeting 论文",
      ]},
    ],
    internship: "你学过阻抗控制，这块能给公司提建议：比如如果公司现有的力位混控实现方式，对比你学的「标准」方法，有哪些工程优化点",
    embodied: "阻抗控制让机械臂「柔顺」——能在接触任务中自然地与环境交互，不像位置控制那样「一碰就崩」。Force-aware VLA 需要有阻抗/导纳控制作为底层支撑，否则 VLA 输出了力指令也无法执行。",
    milestone: "Pybullet 阻抗控制跑通，能演示 K 调节；LoRA CV 实验完成",
    resources: ["Hogan 1985 Impedance Control（经典论文）", "LoRA 论文", "Pybullet 文档"],
  },
  {
    week: 12, phase: 2,
    title: "Phase 2 收尾 + 小项目整理",
    overview: "Phase 0+1（书面叫 Phase 1+2）正式结束，有作品能拿出来",
    tracks: [
      { name: "A · 真机扫尾", hours: 5, color: C.red, items: [
        "阻抗控制真机初探（如有力矩接口）",
        "整理公司内的工作交付物，写技术文档",
      ]},
      { name: "B · 项目整理", hours: 6, color: C.teal, items: [
        "选一个 Phase 1+2 学的小东西做成 GitHub 项目（IK 求解器 or minGPT）",
        "README 精美化：介绍、安装、用法、原理（带图）",
        "录一段 30 秒 demo（screencast 或真机视频）",
      ]},
      { name: "C · 复盘", hours: 3, color: C.purple, items: [
        "Phase 1+2 完整复盘文档，评估自己哪里学得好、哪里还薄弱",
        "Phase 3（模仿学习）预读：ACT 论文初读",
      ]},
    ],
    internship: "Phase 0+1 结束，你在公司应该已经是「能打的实习生」——熟悉 A7Lite 硬件、有机器人学基础、会 PyTorch。和 mentor 沟通：下一阶段（Phase 3）我希望开始接触模仿学习相关工作",
    embodied: "前 12 周（3 个月）是地基。你现在有了机器人学素养、有了 ML 工程能力、有了真机手感、有了 1 个作品。下一步是真正进入具身智能核心——模仿学习和 VLA。",
    milestone: "一个完整小项目上 GitHub（README+demo）；Phase 1+2 复盘文档；ACT 论文初读完成",
    resources: ["优秀 GitHub 项目 README 范例（LeRobot）", "ACT 论文 arxiv.org/abs/2304.13705"],
  },

  // ═════════════════ PHASE 3 · 模仿学习+入学 (W13-24) ═════════════════
  {
    week: 13, phase: 3,
    title: "ACT 启动 + 强化学习基础",
    overview: "正式进入具身学习算法，双线推进：模仿学习（ACT）和强化学习（PPO）",
    tracks: [
      { name: "A · 模仿学习", hours: 6, color: C.red, items: [
        "精读 ACT 论文（ICRA 2023）",
        "理解 BC 的 distribution shift 问题",
        "ACT 的 CVAE encoder + action chunking 设计哲学",
      ]},
      { name: "B · 强化学习", hours: 5, color: C.blue, items: [
        "OpenAI Spinning Up 前 2 章：MDP、策略梯度",
        "PPO 的 clip objective 理解",
        "跑通 CleanRL 的 PPO 在 CartPole",
      ]},
      { name: "C · 仿真+论文", hours: 3, color: C.purple, items: [
        "MuJoCo 基础教程（视频 2 小时）",
        "精读 Diffusion Policy 论文（RSS 2023）",
      ]},
    ],
    internship: "跟 mentor 申请：能不能参与一些模仿学习相关的轻量任务？比如读 LeRobot 代码、数据格式转换。把学习和实习咬合",
    embodied: "模仿学习是当今具身智能最主流的范式——所有主流 VLA（RT-2、π0、OpenVLA）都是在大规模模仿学习数据上预训练。不懂 BC/ACT/DP 的历史，就看不懂现代 VLA 的设计动机。",
    milestone: "精读 ACT + DP 两篇论文完整笔记；CleanRL PPO CartPole 跑通",
    resources: ["ACT paper + code", "Spinning Up", "CleanRL github.com/vwxyzjn/cleanrl"],
  },
  {
    week: 14, phase: 3,
    title: "LeRobot 上手 + PPO 进阶",
    overview: "LeRobot 是具身学习的事实标准框架；PPO 在 MuJoCo 训练",
    tracks: [
      { name: "A · LeRobot", hours: 7, color: C.red, items: [
        "LeRobot 代码库完整读一遍（2 万行不到）",
        "理解 LeRobot 的 Dataset/Policy/Env 抽象",
        "用 LeRobot 跑 ACT 在 PushT 仿真（达到论文报告的成功率）",
      ]},
      { name: "B · RL", hours: 4, color: C.blue, items: [
        "PPO 在 LunarLander-v2 训到收敛",
        "学习 GAE（广义优势估计）、entropy bonus 这些工程细节",
        "调参实战：lr、gamma、clip_range、n_steps 的影响",
      ]},
      { name: "C · 仿真", hours: 3, color: C.green, items: [
        "MuJoCo 加载 A7Lite URDF，可视化",
        "在 MuJoCo 里写一个最简单 push task 环境",
      ]},
    ],
    internship: "把公司主从臂采的遥操数据转为 LeRobot 格式——这是你个人学习和公司工作的完美交集。交付物：公司数据的 LeRobot adapter",
    embodied: "LeRobot 是未来 2-3 年具身学习的主流框架（类似早期的 TensorFlow 或 PyTorch）。熟练它，意味着你能读懂 80% 的开源具身项目代码、能快速复现 SOTA、能贡献开源社区。这是工程能力上的护城河。",
    milestone: "ACT 在 PushT 跑出论文基线；PPO LunarLander 收敛；A7Lite 在 MuJoCo 可视化",
    resources: ["LeRobot github.com/huggingface/lerobot", "MuJoCo 文档", "PushT benchmark"],
  },
  {
    week: 15, phase: 3,
    title: "Diffusion Policy 深化 + SAC",
    overview: "DP 代码级吃透；RL 覆盖连续动作算法（SAC）",
    tracks: [
      { name: "A · Diffusion Policy", hours: 7, color: C.red, items: [
        "diffusion_policy 官方仓库跑通，在 PushT 达到基线",
        "理解 DP 的网络结构：conditional U-Net 还是 Transformer",
        "对比 DP 和 ACT 在相同任务上的效果（用 LeRobot 跑）",
      ]},
      { name: "B · RL", hours: 4, color: C.blue, items: [
        "SAC 理论（soft actor-critic、entropy regularization）",
        "SAC 在 MuJoCo Ant-v4 训练",
        "对比 PPO vs SAC 的稳定性和数据效率",
      ]},
      { name: "C · 项目 #1 规划", hours: 3, color: C.teal, items: [
        "规划第一个真机项目：ACT vs DP on A7Lite+L20",
        "设计任务（比如抓方块放盒子）、评估指标、数据采集计划",
      ]},
    ],
    internship: "项目 #1 和公司工作可以对齐——如果公司需要在 A7Lite+L20 上跑 IL 基线，你的项目就是公司 deliverable；如果不需要，就独立做",
    embodied: "Diffusion Policy 和 ACT 是具身 IL 的双子星。能讲清楚它们的异同（DP 多模态表达力强但推理慢，ACT 推理快但受限于 CVAE），你就能回答所有 IL 相关面试题。",
    milestone: "DP 在 PushT 达到基线；SAC MuJoCo 收敛；项目 #1 方案文档完成",
    resources: ["diffusion_policy repo", "SAC 原论文 Haarnoja et al. 2018"],
  },
  {
    week: 16, phase: 3,
    title: "项目 #1 启动：真机数据采集 + Isaac Lab",
    overview: "项目 #1 正式启动数据采集；Isaac Lab 开始接触",
    tracks: [
      { name: "A · 项目 #1", hours: 8, color: C.teal, items: [
        "设计演示任务：A7Lite+L20 抓方块放指定位置",
        "采集 30-50 条真机演示（用主从臂+力反馈手套）",
        "数据检查：时间对齐、无缺帧、动作合理",
      ]},
      { name: "B · 仿真进阶", hours: 4, color: C.red, items: [
        "Isaac Lab 入门 tutorial（NVIDIA 事实标准仿真器）",
        "理解 GPU 并行训练的优势（MuJoCo 单环境 vs Isaac Lab 4096 环境）",
      ]},
      { name: "C · 论文", hours: 3, color: C.purple, items: [
        "精读 Isaac Lab paper（2025）",
        "精读 Mobile ALOHA（bimanual manipulation 参考）",
      ]},
    ],
    internship: "项目 #1 的数据采集大量依赖真机——这既是个人项目也是实习工作（如果数据能被公司复用）。提前跟 mentor 确认数据归属和使用权限",
    embodied: "真机数据采集是具身智能的瓶颈环节之一：成本高、效率低、质量难保证。你亲自做一遍数据采集，会深刻理解为什么 Open-X Embodiment 那样的大规模数据集是如此宝贵的社区贡献。",
    milestone: "项目 #1 真机数据 30+ 条；Isaac Lab 安装+基础跑通；精读 2 篇",
    resources: ["Isaac Lab 文档 isaac-sim.github.io/IsaacLab", "Mobile ALOHA 论文"],
  },
  {
    week: 17, phase: 3,
    title: "真机训练 ACT + Isaac Lab 任务",
    overview: "用真机数据训 ACT，第一次端到端跑通；Isaac Lab 构建任务",
    tracks: [
      { name: "A · 项目 #1 训练", hours: 7, color: C.teal, items: [
        "用 LeRobot 训练 ACT 在你的真机数据上",
        "调参：chunk_size、learning_rate、epochs",
        "真机部署测试，记录 20 次抓取成功率",
      ]},
      { name: "B · Isaac Lab", hours: 4, color: C.red, items: [
        "Isaac Lab 里搭一个自定义任务（pick-and-place）",
        "跑通 Isaac Lab 的 PPO 训练例子",
      ]},
      { name: "C · 论文", hours: 2, color: C.purple, items: [
        "精读 Domain Randomization (Tobin 2017)",
        "精读 HIL-SERL（真机 RL 微调）",
      ]},
    ],
    internship: "把训练结果回报给公司——真机上 ACT 的成功率、失败模式分析，这是有价值的工程 insight",
    embodied: "从数据到训练到部署是一个完整闭环。你这周体验了这个闭环——采数据、调参、部署、测试、debug。这就是具身算法工程师的日常，做好了这个闭环，你就入门了。",
    milestone: "ACT 在真机任务成功率 >50%；Isaac Lab 自定义任务可运行；2 篇论文精读",
    resources: ["HIL-SERL github.com/rail-berkeley/serl", "DR Tobin et al. 2017"],
  },
  {
    week: 18, phase: 3,
    title: "项目 #1 DP 对比 + 扩散数学",
    overview: "项目 #1 跑 Diffusion Policy 对比；深化扩散模型数学",
    tracks: [
      { name: "A · 项目 #1", hours: 6, color: C.teal, items: [
        "用相同数据训 Diffusion Policy",
        "真机部署，20 次测试，记录成功率",
        "画对比图：ACT vs DP 在成功率、推理延迟、稳定性的差异",
      ]},
      { name: "B · 扩散数学", hours: 4, color: C.red, items: [
        "DDPM 从 forward process 到 ELBO 的完整推导",
        "Score matching 和 DDPM 的等价性",
        "Classifier-free Guidance 原理",
      ]},
      { name: "C · 论文+仿真", hours: 3, color: C.purple, items: [
        "精读 OpenX-Embodiment（2024）——具身大数据集",
        "Isaac Lab + DR 实战",
      ]},
    ],
    internship: "项目 #1 对比结果如果有价值（DP 比 ACT 好 / 或相反），可以写成公司内部技术备忘录",
    embodied: "DP 为什么能处理动作多模态？因为扩散模型本身就建模分布而不是点预测。理解这一点，你就理解了 π0 为什么采用 flow matching action head——都是同一个动机：多模态动作表达。",
    milestone: "项目 #1 ACT vs DP 完整对比数据；扩散模型 ELBO 手推；精读 OpenX",
    resources: ["DDPM 详细推导博客（lilianweng.github.io）", "Classifier-free Guidance 论文"],
  },
  {
    week: 19, phase: 3,
    title: "项目 #1 收尾 + 入学准备",
    overview: "项目 #1 打磨发布；入学倒计时准备",
    tracks: [
      { name: "A · 项目 #1 发布", hours: 8, color: C.teal, items: [
        "GitHub 仓库完善：README、LICENSE、依赖清单",
        "录 3 分钟 demo 视频（B 站/YouTube）",
        "写技术博客（3000 字）：ACT vs DP 在 A7Lite 上的实战报告",
      ]},
      { name: "B · 扩散模型", hours: 3, color: C.red, items: [
        "DDIM 和 Flow Matching 的对比",
        "实现一个简单的 Flow Matching 模型（2D toy example）",
      ]},
      { name: "C · 入学准备", hours: 3, color: C.purple, items: [
        "研究生选课初步评估（等课程列表出来）",
        "与未来导师电子沟通：实习/研究方向磨合",
      ]},
    ],
    internship: "项目 #1 博客发出前先给公司看一遍，确保没有敏感信息。处理好后再对外发布",
    embodied: "你的第一个具身作品诞生——ACT vs DP on LinkerHand。这篇博客可能成为你职业生涯的第一个技术品牌符号。认真对待发布，审稿式打磨。",
    milestone: "项目 #1 完整发布（GitHub + 视频 + 博客）；Flow Matching toy 实现",
    resources: ["优秀技术博客模板", "Flow Matching 代码参考"],
  },
  {
    week: 20, phase: 3,
    title: "入学周 · 身份转变",
    overview: "正式研究生入学，时间结构变化，实习转兼职",
    tracks: [
      { name: "A · 学校适应", hours: 5, color: C.gold, items: [
        "学期课程启动，熟悉校园、图书馆、实验室",
        "和导师见面，了解实验室研究方向",
        "课程任务梳理，规划每周学习时间",
      ]},
      { name: "B · 项目 #1 传播", hours: 3, color: C.teal, items: [
        "博客发布到知乎、X（如有账号）",
        "监控反馈、回复评论",
      ]},
      { name: "C · 继续学习", hours: 4, color: C.red, items: [
        "扩散模型代码实战：用 diffusers 训一个小模型",
        "精读 SmolVLA（小尺寸 VLA 预读）",
      ]},
    ],
    internship: "入学后实习转兼职，提前和实习公司 mentor 沟通每周工作节奏。建议每周 2-3 天到公司（等于 15-20h）",
    embodied: "从纯实习生到研究生 + 兼职实习的转变，时间管理能力被动提升。好的一面：有了实验室支撑，研究资源更多；挑战：时间碎片化，需要更严格的自律",
    milestone: "入学稳定，时间表建立；项目 #1 博客获得一定传播；扩散模型代码熟悉",
    resources: ["研究生时间管理方法", "SmolVLA 论文"],
  },
  {
    week: 21, phase: 3,
    title: "扩散模型实战 + VLA 预读",
    overview: "扩散模型从论文到代码；VLA 主流模型开始接触",
    tracks: [
      { name: "A · 扩散模型", hours: 5, color: C.red, items: [
        "用 diffusers 训一个图像扩散模型（猫脸生成 or 类似）",
        "Flow Matching 代码实现（参考公开实现）",
        "理解 score、velocity 等概念",
      ]},
      { name: "B · ML 工具", hours: 4, color: C.blue, items: [
        "HuggingFace transformers 进阶：tokenizer、generate",
        "学会读 HuggingFace 模型卡、config.json、tokenizer.json",
      ]},
      { name: "C · VLA 预读", hours: 3, color: C.purple, items: [
        "精读 RT-1（Google 2022）",
        "理解 action discretization 的动机",
      ]},
    ],
    internship: "保持真机实验的手感，每周至少一次上机",
    embodied: "扩散模型是 π0/Diffusion Policy/SmolVLA 等当代具身方法的核心。VLA 是你接下来几个月的主战场——RT-1 是起点，必须精读。",
    milestone: "扩散模型图像生成 demo；Flow Matching 代码理解；精读 RT-1",
    resources: ["HuggingFace Diffusers tutorial", "RT-1 paper"],
  },
  {
    week: 22, phase: 3,
    title: "RT-2 + VLA 实战入门",
    overview: "RT-2 开启 VLM→VLA 范式理解",
    tracks: [
      { name: "A · VLA 论文", hours: 6, color: C.red, items: [
        "精读 RT-2：VLM → VLA 的桥梁",
        "理解 action as text token 的编码方式",
        "VLA 的两代：action discretization 时代 vs diffusion/flow 时代",
      ]},
      { name: "B · ML", hours: 3, color: C.blue, items: [
        "HuggingFace PEFT 库（LoRA、QLoRA）入门",
        "理解为什么大模型需要 LoRA 微调",
      ]},
      { name: "C · 真机维护", hours: 3, color: C.green, items: [
        "A7Lite+L20 系统维护，保持可用状态",
        "整理过去的遥操数据，为 Phase 4 项目 #2 准备",
      ]},
    ],
    internship: "此时公司 VLA 组可能已在做类似工作，你可以提交读论文的笔记作为技术分享",
    embodied: "RT-1→RT-2 是 VLA 技术路线的关键一步：从专用小模型到 VLM 基座迁移。理解了这个演化，就理解了为什么 OpenVLA/π0 选择不同的 VLM 基座（Llama vs PaliGemma vs Pi's own）",
    milestone: "精读 RT-2，能讲清楚 action tokenization；LoRA 工具链熟悉",
    resources: ["RT-2 arxiv.org/abs/2307.15818", "PEFT library"],
  },
  {
    week: 23, phase: 3,
    title: "OpenVLA 启动",
    overview: "OpenVLA 是第一个开源 SOTA VLA，必须吃透",
    tracks: [
      { name: "A · OpenVLA", hours: 7, color: C.red, items: [
        "精读 OpenVLA 论文（Kim et al. 2024）",
        "克隆 OpenVLA 代码仓库，配置环境",
        "跑通 OpenVLA 的 inference demo（用官方 checkpoint）",
      ]},
      { name: "B · 云 GPU 准备", hours: 2, color: C.teal, items: [
        "AutoDL 注册，熟悉界面和计费",
        "租个 A100 跑一次测试（几十块试水）",
      ]},
      { name: "C · 项目 #2 规划", hours: 3, color: C.purple, items: [
        "项目 #2：在 A7Lite+L20 上跑 SmolVLA/π0 fine-tune",
        "初步任务定义、数据需求估算",
      ]},
    ],
    internship: "如果实习 VLA 组也在做 OpenVLA 复现，可以贡献 baseline 跑通的经验",
    embodied: "OpenVLA 作为第一个开源 SOTA，是整个社区的 benchmark。后续任何 VLA 工作（包括学术论文和工业项目）几乎都会用它做对比。",
    milestone: "OpenVLA inference 跑通；AutoDL 使用熟悉；项目 #2 方案初稿",
    resources: ["OpenVLA github.com/openvla/openvla", "AutoDL autodl.com"],
  },
  {
    week: 24, phase: 3,
    title: "π0 深入 + Phase 3 收尾",
    overview: "π0 是工业界最常 fine-tune 的基座；Phase 3 即将结束",
    tracks: [
      { name: "A · π0", hours: 7, color: C.red, items: [
        "精读 π0 论文（Physical Intelligence）",
        "克隆 openpi 代码仓库，研究目录结构",
        "理解 π0 的 flow matching action head 设计",
      ]},
      { name: "B · 复盘", hours: 3, color: C.purple, items: [
        "Phase 3 复盘文档（12 周完整成果）",
        "自我能力评估：机器人学+ML+IL+VLA 各维度打分",
      ]},
      { name: "C · 项目准备", hours: 2, color: C.teal, items: [
        "项目 #2 任务最终定稿",
        "Phase 4 学习节奏预规划",
      ]},
    ],
    internship: "和实习 mentor review Phase 3 成果，讨论 Phase 4 可能的对接（VLA fine-tune 相关工作）",
    embodied: "Phase 3 完成时，你从「只会跑 CV 的工程师」进化为「理解具身算法主流范式的研究者」。你能看懂 VLA 论文、能修改 VLA 代码、能在真机上部署——这是 Phase 4 的基础能力。",
    milestone: "精读 π0 + openpi 代码；Phase 3 复盘文档；项目 #2 方案就绪",
    resources: ["π0 arxiv.org/abs/2410.24164", "openpi github.com/physical-intelligence/openpi"],
  },

  // ═════════════════ PHASE 4 · VLA 专精 (W25-36) ═════════════════
  {
    week: 25, phase: 4,
    title: "SmolVLA 本地跑通",
    overview: "SmolVLA 是本地 GPU 能玩的小 VLA，Phase 4 起点",
    tracks: [
      { name: "A · SmolVLA", hours: 7, color: C.red, items: [
        "SmolVLA 代码吃透，理解 500M 参数的架构",
        "在本地 RTX 5060 跑 inference（可能需要量化）",
        "在一个任务上做简单 fine-tune（用少量数据）",
      ]},
      { name: "B · 真机数据", hours: 3, color: C.green, items: [
        "为项目 #2 采集新数据（50-100 条，精挑任务）",
        "数据标注：task 描述、success flag",
      ]},
      { name: "C · 论文", hours: 2, color: C.purple, items: [
        "精读 GR00T N1.5（NVIDIA 人形机器人基座）",
        "泛读：Octo, RDT",
      ]},
    ],
    internship: "数据采集可以在公司机器上做，效率更高",
    embodied: "小模型（SmolVLA）是快速迭代的利器——1 小时内训完，快速验证想法。大模型（π0/OpenVLA）留到想法验证后用云 GPU 放大。这是工业界的标准 workflow。",
    milestone: "SmolVLA 本地 inference + 简单 fine-tune；真机数据 50+ 条；精读 GR00T",
    resources: ["SmolVLA on HuggingFace", "GR00T N1.5 论文"],
  },
  {
    week: 26, phase: 4,
    title: "SmolVLA 真机部署 + 云 GPU 实战",
    overview: "SmolVLA 在 A7Lite+L20 上部署；第一次云端 VLA 实验",
    tracks: [
      { name: "A · 项目 #2", hours: 7, color: C.teal, items: [
        "SmolVLA 在 A7Lite+L20 真机 inference（考虑延迟）",
        "真机测试 20 次，记录成功率",
        "失败模式分析：图像不清？动作不稳？推理太慢？",
      ]},
      { name: "B · 云 GPU", hours: 4, color: C.red, items: [
        "AutoDL A100 租 4 小时，跑一次 π0 fine-tune 实验",
        "学习 rsync 数据传输、tmux 保持 session",
      ]},
      { name: "C · 论文", hours: 2, color: C.purple, items: [
        "精读：LIBERO benchmark（VLA 评估标准）",
      ]},
    ],
    internship: "真机部署中遇到的工程问题（延迟、同步、内存）都是公司工作能积累的 insight",
    embodied: "真机部署 VLA 是工程与研究的结合——论文报告的成功率是在仿真或 ALOHA 这样的标准平台上，你在 LinkerBot 平台上部署会遇到大量「论文没写」的问题。这些问题就是你的独特贡献",
    milestone: "SmolVLA 真机部署，有量化成功率；云 GPU 首次实验，预算控制好",
    resources: ["LIBERO benchmark", "AutoDL 使用技巧"],
  },
  {
    week: 27, phase: 4,
    title: "π0 云端 fine-tune + 多模态思路",
    overview: "π0 是工业基座，云端 fine-tune；开始思考多模态融合",
    tracks: [
      { name: "A · π0 fine-tune", hours: 7, color: C.red, items: [
        "AutoDL A100 租 8-10 小时，完整 fine-tune 一次 π0",
        "选一个有挑战的任务（接触任务或精细操作）",
        "实验数据完整记录（wandb + 本地备份）",
      ]},
      { name: "B · 多模态思路", hours: 3, color: C.blue, items: [
        "调研：如何把 force 信号加入 VLA",
        "三种方案：Early Fusion / Cross-Attention / Late Fusion",
        "画架构图，选一种先尝试",
      ]},
      { name: "C · 论文", hours: 2, color: C.purple, items: [
        "精读：HIL-SERL（真机 RL 微调 VLA）",
      ]},
    ],
    internship: "多模态融合和公司 VLA 组需求直接对齐，这块可以深度对接",
    embodied: "π0 是 2025-2026 年工业界最广泛 fine-tune 的 VLA 基座。你能 fine-tune π0 完成一个自定义任务，就可以把这项能力放进简历最顶部。",
    milestone: "π0 fine-tune 一次完整实验；Force 融合架构图；精读 HIL-SERL",
    resources: ["π0 fine-tune 指南（openpi 文档）", "HIL-SERL github.com/rail-berkeley/serl"],
  },
  {
    week: 28, phase: 4,
    title: "Force 融合 Early Fusion 实验",
    overview: "最简单的多模态融合：在输入端拼接 force 向量",
    tracks: [
      { name: "A · Early Fusion", hours: 7, color: C.red, items: [
        "修改 π0 的 proprio encoder：在关节状态后拼接 force(6,) 向量",
        "准备数据：确保真机数据中 force 通道可用",
        "训练+评估：有 force vs 无 force 对比",
      ]},
      { name: "B · 真机扩展", hours: 4, color: C.green, items: [
        "采集更多带 force 标签的演示数据（接触任务）",
        "数据时间对齐检查（图像 vs 力 vs 关节，ms 级）",
      ]},
      { name: "C · 论文", hours: 2, color: C.purple, items: [
        "精读 Flamingo（多模态融合参考）",
      ]},
    ],
    internship: "这块实验完全可以和公司 VLA 组需求（Pose+Force 模型结构）对齐，甚至成为公司内部项目",
    embodied: "Early Fusion 是多模态融合最简单的基线——如果它没用，更复杂的方法（Cross-Attention）才值得尝试。这是严谨的实验设计顺序。",
    milestone: "Early Fusion 有/无 force 对比完整数据；数据对齐精度确认",
    resources: ["Flamingo 论文", "多模态融合综述"],
  },
  {
    week: 29, phase: 4,
    title: "Cross-Attention 探索",
    overview: "更细腻的多模态融合：Cross-Attention",
    tracks: [
      { name: "A · Cross-Attention", hours: 7, color: C.red, items: [
        "在 π0 的 action decoder 中加 cross-attention 层",
        "Query 来自 vision+proprio，Key/Value 来自 force tokens",
        "梯度检查：force encoder 的梯度是否正常",
      ]},
      { name: "B · 真机实验", hours: 4, color: C.green, items: [
        "Early Fusion vs Cross-Attention 真机对比",
        "20+ 次重复实验，成功率/推理延迟统计",
      ]},
      { name: "C · 论文", hours: 2, color: C.purple, items: [
        "精读 ImageBind（跨模态对齐）",
      ]},
    ],
    internship: "实验结果可以在公司内部分享，建立你在 VLA 组的专家形象",
    embodied: "Cross-Attention 让 VLA 在每个动作 token 预测时都「参考」当前的 force 状态——这在物理上更合理。如果它比 Early Fusion 好，说明结构创新有意义",
    milestone: "Cross-Attention 代码跑通；两种融合方法对比数据",
    resources: ["ImageBind 论文", "π0 代码中的 action decoder"],
  },
  {
    week: 30, phase: 4,
    title: "项目 #2 完成 + Sim2Real 启动",
    overview: "项目 #2（真机 VLA fine-tune）完结；Sim2Real 作为下阶段技术栈",
    tracks: [
      { name: "A · 项目 #2 完善", hours: 6, color: C.teal, items: [
        "项目 #2 最终版：VLA fine-tune + force 融合完整实验",
        "GitHub 发布，技术博客准备",
        "3 分钟 demo 视频",
      ]},
      { name: "B · Sim2Real", hours: 5, color: C.red, items: [
        "Domain Randomization 实战：在 Isaac Lab 上做视觉/动力学随机化",
        "理解 co-training：混合仿真和真机数据",
      ]},
      { name: "C · 论文", hours: 2, color: C.purple, items: [
        "精读 DR 经典论文 + co-training 相关",
      ]},
    ],
    internship: "项目 #2 发布前先给公司看，敏感信息脱敏",
    embodied: "Sim2Real 是具身智能的永恒主题——仿真便宜但不真，真机真但采集贵。Co-training 是一个经济的折中方案。你理解它，就理解了工业部署的真实考虑。",
    milestone: "项目 #2 完整发布（GitHub+demo+博客）；DR 实战跑通",
    resources: ["DR Tobin 2017", "Isaac Lab DR 工具"],
  },
  {
    week: 31, phase: 4,
    title: "HIL-SERL 深入",
    overview: "HIL-SERL 是真机 RL 微调 IL 策略的 SOTA",
    tracks: [
      { name: "A · HIL-SERL", hours: 7, color: C.red, items: [
        "HIL-SERL 论文精读",
        "serl 仓库代码阅读",
        "理解 RL 如何在真机上微调（relevant for fine-tuning VLA）",
      ]},
      { name: "B · 真机数据", hours: 4, color: C.green, items: [
        "为项目 #3（拳头项目）规划数据采集",
        "选一个 challenging 任务：插孔/拧螺母/倒水",
      ]},
      { name: "C · 论文", hours: 2, color: C.purple, items: [
        "泛读最新 VLA 工作（最近 arxiv）",
      ]},
    ],
    internship: "HIL-SERL 相关工作可以和实习讨论，看能否作为 RSS 投稿方向（如果公司有意向）",
    embodied: "单纯 IL 的成功率有上限（60-80%）。工业部署要求 95%+，差距来自真机 RL 微调。HIL-SERL 是让 policy 从「好」到「可用」的关键一步。",
    milestone: "HIL-SERL 论文+代码理解；项目 #3 任务定稿",
    resources: ["HIL-SERL 论文 + serl repo"],
  },
  {
    week: 32, phase: 4,
    title: "项目 #3 启航 · 拳头项目",
    overview: "你最重要的作品启动：真机 VLA + Sim2Real + 多模态融合",
    tracks: [
      { name: "A · 项目 #3 数据", hours: 8, color: C.teal, items: [
        "任务：[用户选定的 challenging 任务]",
        "采集 100+ 条真机演示（带 force，可能带 pose-from-EMG-team 数据）",
        "并行：Isaac Lab 里搭对应仿真任务",
      ]},
      { name: "B · Sim2Real", hours: 3, color: C.red, items: [
        "co-training 初步实验",
        "学习 system identification 基础",
      ]},
      { name: "C · 论文", hours: 2, color: C.purple, items: [
        "精读 Sim2Real 综述或相关最新工作",
      ]},
    ],
    internship: "项目 #3 如果和公司 RSS 投稿方向契合，会是巨大加成；如果不契合，坚持个人方向",
    embodied: "项目 #3 是你 15 个月的技术集大成之作——真机+IL+VLA+Sim2Real 全栈。这是简历上的核心，面试时被问 30 分钟深度的项目。",
    milestone: "项目 #3 数据 100 条；仿真任务就绪；Sim2Real 初步实验",
    resources: ["Sim2Real 综述"],
  },
  {
    week: 33, phase: 4,
    title: "项目 #3 训练 + 前沿跟踪",
    overview: "项目 #3 进入训练阶段；保持前沿学术敏感",
    tracks: [
      { name: "A · 项目 #3 训练", hours: 8, color: C.teal, items: [
        "选一个 VLA 基座（π0 或 SmolVLA）fine-tune",
        "云 GPU 实验，记录完整超参搜索",
        "真机+仿真对比评估",
      ]},
      { name: "B · 论文", hours: 3, color: C.purple, items: [
        "最新 CoRL/RSS 论文选 2 篇精读",
      ]},
      { name: "C · 真机", hours: 2, color: C.green, items: [
        "真机系统维护，解决 fine-tune 过程的工程问题",
      ]},
    ],
    internship: "云 GPU 预算这周可能用得较多（300-500 元），和实习沟通是否能报销（如果项目和公司对齐）",
    embodied: "你在做的事情——用开源 VLA 基座 + 私有任务数据 fine-tune——正是工业界大多数具身团队的标准流程。你熟练这个流程，就是「能打的算法工程师」",
    milestone: "项目 #3 VLA fine-tune 完成；至少 1 个 baseline 成功率 >60%",
    resources: ["CoRL 2026 accepted papers list"],
  },
  {
    week: 34, phase: 4,
    title: "项目 #3 Sim2Real + 消融",
    overview: "Sim2Real 完整实验；消融研究",
    tracks: [
      { name: "A · Sim2Real 实验", hours: 7, color: C.red, items: [
        "Sim-only 训练 → 真机评估，量化 gap",
        "Sim + DR → 真机评估，gap 缩小多少",
        "Sim + Real co-training → 真机评估",
      ]},
      { name: "B · 消融", hours: 4, color: C.teal, items: [
        "消融：不同融合策略 × 不同训练策略的矩阵",
        "至少 3 次重复，统计显著性",
      ]},
      { name: "C · 论文", hours: 2, color: C.purple, items: [
        "世界模型概览（Dreamer V3、Cosmos）",
      ]},
    ],
    internship: "消融实验是论文的核心，也是你实验设计能力的体现",
    embodied: "一个完整 Sim2Real pipeline 的端到端对比（sim-only vs co-training）是每个具身算法工程师的基本功。你做完这个，就能和任何同行讨论 Sim2Real 问题",
    milestone: "Sim2Real 完整对比数据；消融矩阵；精读 Dreamer/Cosmos",
    resources: ["Dreamer V3 paper", "NVIDIA Cosmos"],
  },
  {
    week: 35, phase: 4,
    title: "HIL-SERL 真机微调",
    overview: "在项目 #3 的 VLA 基础上，用 HIL-SERL 做真机 RL 微调",
    tracks: [
      { name: "A · RL 微调", hours: 8, color: C.red, items: [
        "serl repo 改造为你的任务",
        "reward 设计（关键！）",
        "真机 RL 训练 2-4 小时，看成功率提升",
      ]},
      { name: "B · 工程整理", hours: 3, color: C.teal, items: [
        "项目 #3 代码整理，README 初稿",
      ]},
      { name: "C · 论文", hours: 2, color: C.purple, items: [
        "泛读最新 RL+IL 融合工作",
      ]},
    ],
    internship: "真机 RL 需要大量真机时间，确认公司机时支持",
    embodied: "真机 RL 是把模仿学习的「60% 成功率」提升到「95%」的最后一公里。你掌握这个，就掌握了部署级具身算法的关键能力。",
    milestone: "HIL-SERL 真机微调完成，成功率比 IL 提升 >10%",
    resources: ["serl repo 细节"],
  },
  {
    week: 36, phase: 4,
    title: "项目 #3 收尾 + 年末 (2026 底)",
    overview: "项目 #3 完整，demo 录制，年度复盘",
    tracks: [
      { name: "A · 项目 #3 完成", hours: 7, color: C.teal, items: [
        "最终版代码、完整 README、充分的 demo",
        "3-5 分钟精剪 demo 视频",
        "技术博客（5000 字长文）",
      ]},
      { name: "B · 年度复盘", hours: 3, color: C.purple, items: [
        "8 个月（W1-W36）完整复盘",
        "能力矩阵更新",
        "2027 年规划草案",
      ]},
      { name: "C · 真机维护", hours: 1, color: C.green, items: [
        "年末系统整理",
      ]},
    ],
    internship: "项目 #3 作为年度总结向实习公司做技术分享",
    embodied: "2026 年结束时你手上有 3 个完整作品：小项目、项目 #2、项目 #3。这比任何简历文字都有说服力。",
    milestone: "项目 #3 完整发布；2026 年度复盘；Phase 4 正式结束",
    resources: ["项目展示最佳实践"],
  },

  // ═════════════════ PHASE 5 · 拳头项目+前沿+求职起步 (W37-48) ═════════════════
  {
    week: 37, phase: 5,
    title: "前沿拓展启动 · Touch-Aware VLA",
    overview: "2027 新年，进入前沿方向深化",
    tracks: [
      { name: "A · 触觉 VLA", hours: 6, color: C.red, items: [
        "L20 的触觉传感器数据流（这是你的独特优势）",
        "精读：DIME, T-Dex, Tactile-Augmented Policy Learning",
        "设计小实验：把触觉加入项目 #3 pipeline",
      ]},
      { name: "B · 寒假规划", hours: 3, color: C.gold, items: [
        "寒假时间（1 月中-2 月中）的集中投入计划",
        "RSS 投稿（1 月底）如果涉及你的工作，集中精力支持",
      ]},
      { name: "C · 论文", hours: 3, color: C.purple, items: [
        "精读 VLA-0（2026 年新思路）",
        "扫读最近 ICLR 2027 的 VLA 论文",
      ]},
    ],
    internship: "如果公司 RSS 投稿和你工作相关，这段时间投入增加。新年期间注意平衡",
    embodied: "触觉是 VLA 的下一个前沿模态——视觉+语言已经标配，触觉/力觉/肌电这些 proprioception 是新领域。L20 的触觉 + 你的工程能力是独特组合。",
    milestone: "触觉 VLA 小实验有初步数据；精读 3 篇前沿论文",
    resources: ["DIME 论文", "T-Dex", "VLA-0"],
  },
  {
    week: 38, phase: 5,
    title: "触觉实验 + 研究方法",
    overview: "触觉实验深化；研究方法训练（写作/figure/rebuttal）",
    tracks: [
      { name: "A · 触觉实验", hours: 7, color: C.red, items: [
        "把 L20 触觉数据加入项目 #3 的 VLA",
        "对比：有/无触觉的成功率差异",
        "记录：触觉帮助的典型场景（滑脱检测、精细调整）",
      ]},
      { name: "B · 研究方法", hours: 3, color: C.purple, items: [
        "学习科研写作：Simon Peyton Jones How to Write a Great Paper（YouTube）",
        "学习高质量 figure 制作（matplotlib、seaborn）",
      ]},
      { name: "C · 技术博客", hours: 3, color: C.teal, items: [
        "写第 2 篇技术博客（项目 #3 + 触觉扩展）",
      ]},
    ],
    internship: "如果实习公司有投稿，帮忙打磨 figure 和文字",
    embodied: "触觉 VLA 是一个完整的「小研究」——从问题定义、实验设计、结果呈现。即使不发论文，这也是你自己的研究训练",
    milestone: "触觉实验有完整对比数据；第 2 篇技术博客",
    resources: ["SPJ 写作视频", "Scientific figure best practices"],
  },
  {
    week: 39, phase: 5,
    title: "复现能力训练 · 选一篇 paper 复现",
    overview: "研究能力深化：能复现他人论文",
    tracks: [
      { name: "A · 论文复现", hours: 8, color: C.red, items: [
        "选一篇最近 CoRL/RSS/ICLR 的 paper（和你方向相关）",
        "尝试从零复现 key experiment",
        "记录踩坑和解决方案",
      ]},
      { name: "B · 博客", hours: 3, color: C.teal, items: [
        "复现过程写成博客（读者喜欢这种「复现实验报告」）",
      ]},
      { name: "C · 真机", hours: 2, color: C.green, items: [
        "保持真机手感",
      ]},
    ],
    internship: "复现技能对工作也是直接价值",
    embodied: "能复现 SOTA 是研究能力的重要指标——超过 50% 的学生看论文不做复现，你做了就在 top 50%。面试被问「最近看的论文」，讲你复现的体验比单纯讲方法好 10 倍",
    milestone: "一篇论文成功复现（达到论文 80% 以上指标）；复现博客",
    resources: ["近期 CoRL/RSS best paper"],
  },
  {
    week: 40, phase: 5,
    title: "春节周 · 轻量休整",
    overview: "春节期间，节奏放缓",
    tracks: [
      { name: "A · 休整", hours: 4, color: C.gold, items: [
        "和家人在一起",
        "10 个月回顾和反思",
      ]},
      { name: "B · 轻量阅读", hours: 3, color: C.purple, items: [
        "读一本具身智能科普 or 机器人学入门的书（轻松）",
        "听几期相关 podcast（DeepLearning.AI, Robot Brains）",
      ]},
      { name: "C · 兴趣探索", hours: 3, color: C.teal, items: [
        "自由探索新方向：比如 world model、robot foundation model",
        "或者完全不学习，放松",
      ]},
    ],
    internship: "实习春节假期正常休",
    embodied: "持续高强度学习会倦怠。春节是系统的 reset 机会。你会发现，休息一周后回来，之前卡住的问题突然想通了",
    milestone: "轻松度过春节，保持身心状态",
    resources: ["Robot Brains podcast", "DeepLearning.AI weekly"],
  },
  {
    week: 41, phase: 5,
    title: "简历启动 + 作品集",
    overview: "求职准备正式启动，先从简历和作品集开始",
    tracks: [
      { name: "A · 简历", hours: 5, color: C.teal, items: [
        "简历初稿（中文+英文双版）",
        "每条经历用 STAR 格式，量化结果",
        "技能栈匹配目标公司 JD 关键词",
      ]},
      { name: "B · 作品集", hours: 5, color: C.red, items: [
        "GitHub profile 整理：置顶 3 个代表性仓库",
        "每个项目 README 精美化：原理图、demo GIF、对比表",
      ]},
      { name: "C · 保持研究", hours: 3, color: C.purple, items: [
        "继续读论文，每周 1 篇精读",
      ]},
    ],
    internship: "和实习公司 mentor 讨论推荐信和转正可能性",
    embodied: "简历不是在最后 2 周赶出来的——是一年积累后的整理。你现在有 3 个项目、有博客、有论文贡献（如有），组合拳才是最好的卖点",
    milestone: "简历初稿（中+英）；GitHub profile 整理",
    resources: ["优秀算法工程师简历模板", "STAR 格式"],
  },
  {
    week: 42, phase: 5,
    title: "对外传播 · 技术博客发声",
    overview: "技术品牌建立：多平台发声",
    tracks: [
      { name: "A · 博客发布", hours: 5, color: C.teal, items: [
        "知乎：3 篇深度技术博客（项目 #1/#2/#3 各一）",
        "Medium（英文）：至少 1 篇项目 #3 深度分析",
        "X/Twitter：开账号，发英文 thread",
      ]},
      { name: "B · 视频", hours: 4, color: C.red, items: [
        "B 站/YouTube：发项目 demo 视频",
        "B 站可加中文讲解，YouTube 英文",
      ]},
      { name: "C · LinkedIn", hours: 2, color: C.gold, items: [
        "LinkedIn profile 英文版完善",
        "关注目标公司和业界大牛",
      ]},
    ],
    internship: "博客发布前给公司看确保脱敏",
    embodied: "在具身智能这样新兴的领域，早期建立个人技术品牌获益巨大——几年后你会是业内「有名字的人」，而不是普通求职者",
    milestone: "知乎 3 篇博客 + Medium 1 篇 + X 账号 + LinkedIn 就绪",
    resources: ["技术博客平台对比（知乎/Medium/个人站）"],
  },
  {
    week: 43, phase: 5,
    title: "项目 #3 v2 · 基于反馈优化",
    overview: "基于博客反馈和新想法，项目 #3 做一个 v2",
    tracks: [
      { name: "A · 项目 #3 v2", hours: 8, color: C.teal, items: [
        "集成读者反馈和新想法",
        "加入新实验：比如不同任务泛化性、更多 baseline",
        "重新录制更专业 demo",
      ]},
      { name: "B · 面试准备", hours: 3, color: C.red, items: [
        "LeetCode 启动：每天 1 题中等题",
        "手推反向传播（白板练习）",
      ]},
      { name: "C · 论文", hours: 2, color: C.purple, items: [
        "保持每周 1 篇精读",
      ]},
    ],
    internship: "继续兼职实习，重点放在求职",
    embodied: "项目 #3 v2 的关键是「用户反馈驱动迭代」——这是工业界最常用的 workflow，你体验一次就有完整流程感",
    milestone: "项目 #3 v2 发布；LeetCode 启动",
    resources: ["LeetCode 热门 100 题"],
  },
  {
    week: 44, phase: 5,
    title: "Phase 5 收尾 + 面试题规划",
    overview: "Phase 5 结束，面试准备进入正式阶段",
    tracks: [
      { name: "A · 面试系统准备", hours: 6, color: C.red, items: [
        "列出所有面试高频题（ML 基础、具身专业、LeetCode）",
        "排 6 周复习计划（Phase 6）",
        "找同学模拟面试，记录反馈",
      ]},
      { name: "B · 技能矩阵", hours: 3, color: C.teal, items: [
        "自我评估：对照目标 JD，找 skill gap",
        "针对性补课计划",
      ]},
      { name: "C · 研究继续", hours: 3, color: C.purple, items: [
        "保持 1 篇精读/周的节奏",
      ]},
    ],
    internship: "安排实习转正/推荐信相关事宜",
    embodied: "从 Phase 5 到 Phase 6 是从「研究学习」向「求职输出」的转变。12 个月的积累要在 2-3 个月密集变现",
    milestone: "Phase 5 复盘；Phase 6 详细面试准备计划",
    resources: ["你的目标公司 JD 列表"],
  },

  // ═════════════════ PHASE 6 · 求职冲刺 (W45-60) ═════════════════
  {
    week: 45, phase: 6,
    title: "ML 基础面试冲刺",
    overview: "ML/DL 基础知识系统复习",
    tracks: [
      { name: "A · ML 基础", hours: 7, color: C.red, items: [
        "反向传播手推（白板）5 次",
        "BN vs LN vs GN 的差异和使用场景",
        "优化器对比：SGD/Momentum/Adam/AdamW 数学",
        "过拟合的所有应对方法",
      ]},
      { name: "B · LeetCode", hours: 4, color: C.blue, items: [
        "每天 2 题（1 简单 + 1 中等）",
        "重点：数组、字符串、DP、图",
      ]},
      { name: "C · 项目准备", hours: 2, color: C.teal, items: [
        "3 个项目各准备 30 分钟深度讲解",
      ]},
    ],
    internship: "实习最后阶段，准备交接",
    embodied: "ML 基础题是算法岗面试的必过关——你过去 12 个月一直在用 PyTorch，但不见得能白板手推。这几周补上",
    milestone: "ML 高频 20 题手写答案；LeetCode 14 题",
    resources: ["牛客网 ML 面经", "LeetCode 热门 100"],
  },
  {
    week: 46, phase: 6,
    title: "Transformer + 注意力深化",
    overview: "VLA 面试必问 Transformer 细节",
    tracks: [
      { name: "A · Transformer 深入", hours: 7, color: C.red, items: [
        "FlashAttention 原理（高频考点）",
        "KV cache 实现细节",
        "LoRA 数学与工程实现",
        "Multi-query / Grouped-query Attention",
      ]},
      { name: "B · LeetCode", hours: 4, color: C.blue, items: [
        "每天 2 题，重点：二叉树、回溯、DP",
      ]},
      { name: "C · 系统设计", hours: 2, color: C.teal, items: [
        "「如何设计一个真机 VLA pipeline」模拟讲解",
      ]},
    ],
    internship: "收尾：工作交接文档",
    embodied: "Transformer 被问细节是因为它是所有现代 LM/VLM/VLA 的基础。你答不出 FlashAttention 和 KV cache，就会被打上「基础不扎实」标签",
    milestone: "Transformer 深度题 10 题；LeetCode 累计 28 题",
    resources: ["FlashAttention 原论文", "KV cache 图解"],
  },
  {
    week: 47, phase: 6,
    title: "具身专业面 · IL/RL/VLA",
    overview: "具身智能专业知识系统化",
    tracks: [
      { name: "A · 具身面试", hours: 7, color: C.red, items: [
        "PPO 完整推导（白板）+ clip objective 解释",
        "BC 的 distribution shift + Diffusion Policy 如何解决",
        "VLA 的 action tokenization 方案对比",
        "Sim2Real gap 的 5 种应对",
      ]},
      { name: "B · LeetCode", hours: 4, color: C.blue, items: [
        "LeetCode 42 题总量",
      ]},
      { name: "C · 项目深讲", hours: 2, color: C.teal, items: [
        "模拟面试中讲项目，找同学挑错",
      ]},
    ],
    internship: "实习结束（或转正讨论中）",
    embodied: "具身智能面试的差异化点——不是所有算法岗都问这些。你的 12 个月让你在这块比「普通算法工程师」强一个量级",
    milestone: "具身面试高频 15 题；LeetCode 累计 42 题",
    resources: ["具身智能之心面经合集"],
  },
  {
    week: 48, phase: 6,
    title: "系统设计 + 项目深讲",
    overview: "高级面试：系统设计和深度项目讨论",
    tracks: [
      { name: "A · 系统设计", hours: 6, color: C.red, items: [
        "「设计一个 100 人标注员的遥操数据采集系统」",
        "「设计真机 VLA 在线训练+部署 pipeline」",
        "「设计一个支持 10 种机器人形态的 VLA 训练基础设施」",
      ]},
      { name: "B · LeetCode", hours: 4, color: C.blue, items: [
        "持续刷题",
      ]},
      { name: "C · 行为面", hours: 3, color: C.teal, items: [
        "STAR 故事库建立（你的亮点时刻）",
        "常见 HR 问题准备",
      ]},
    ],
    internship: "彻底结束实习（如不转正）",
    embodied: "系统设计是区分「工程师」和「高级工程师」的标准——不是写代码，而是做技术选择。你在 LinkerBot 做的 pipeline 就是真实系统设计",
    milestone: "系统设计 3 个完整答案；STAR 故事库 10 个",
    resources: ["System Design Primer", "STAR 方法"],
  },
  {
    week: 49, phase: 6,
    title: "投递正式启动",
    overview: "简历+内推投向目标公司",
    tracks: [
      { name: "A · 投递", hours: 6, color: C.red, items: [
        "列 Top 15 目标公司：银河通用/智元/星动/宇树/逐际/字节/阿里/华为/腾讯/美团/...",
        "每家找 1-2 个内推人（脉脉/LinkedIn/同学）",
        "定向投递：每个简历根据 JD 微调",
      ]},
      { name: "B · 面试练习", hours: 4, color: C.blue, items: [
        "和同学做 mock interview 4-6 次",
        "录音回听，找自己表达的弱点",
      ]},
      { name: "C · 研究保持", hours: 2, color: C.purple, items: [
        "保持研究敏感度，面试官可能问「最近看的论文」",
      ]},
    ],
    internship: "实习已结束",
    embodied: "投递的黄金法则：**慢投精投优于海投**。一家公司花 2 小时深入研究 JD+内推，胜过 100 家海投简历石沉大海",
    milestone: "投出 Top 10 公司简历，有内推的那种",
    resources: ["脉脉、LinkedIn 内推文化"],
  },
  {
    week: 50, phase: 6,
    title: "第一波面试",
    overview: "一面二面密集期",
    tracks: [
      { name: "A · 面试", hours: "视情况", color: C.red, items: [
        "一面：ML 基础 + LeetCode 题 + 聊项目",
        "二面：具身专业题 + 深度项目 + 可能系统设计",
        "三面（如有）：技术 lead 或 VP 聊远景",
      ]},
      { name: "B · 面试复盘", hours: 5, color: C.teal, items: [
        "每场面试后写复盘：哪些题答好、哪些答差、下次怎么改",
        "对不会的题目补课（24 小时内）",
      ]},
      { name: "C · 继续投递", hours: 3, color: C.blue, items: [
        "基于反馈调整简历",
        "投递第二批候选公司",
      ]},
    ],
    internship: "完全结束",
    embodied: "第一场面试一般会翻车——没关系，那是为了让你知道真实面试和准备的差距。前 3 场面试是「练兵」，真正的机会从第 4-5 场开始",
    milestone: "至少经历 3-5 场面试；有完整复盘",
    resources: ["面试复盘模板"],
  },
  {
    week: 51, phase: 6,
    title: "面试密集期",
    overview: "持续面试，积累经验",
    tracks: [
      { name: "A · 面试", hours: "多", color: C.red, items: [
        "平均每周 3-5 场面试（如果火热）",
        "学会调整心态：每场都是学习",
      ]},
      { name: "B · 针对性准备", hours: 4, color: C.teal, items: [
        "基于每家公司特点针对准备",
        "例如字节喜欢问算法实现，华为偏系统设计",
      ]},
      { name: "C · 新增投递", hours: 2, color: C.blue, items: [
        "继续拓宽候选池",
      ]},
    ],
    internship: "已结束",
    embodied: "面试密度最好控制在每周 3-5 场——太少没手感，太多没时间准备和复盘",
    milestone: "5-10 场面试经验；开始出现 offer 意向",
    resources: ["面试话术积累"],
  },
  {
    week: 52, phase: 6,
    title: "Offer 谈判",
    overview: "多个 offer 比较，谈薪资",
    tracks: [
      { name: "A · Offer 比较", hours: 5, color: C.red, items: [
        "建立对比表：公司/岗位/薪资/地点/团队/成长",
        "不只看钱：团队质量、技术栈、业务前景更重要",
      ]},
      { name: "B · 谈判", hours: 4, color: C.teal, items: [
        "学习薪资谈判策略",
        "有多个 offer 时，合理使用竞价",
      ]},
      { name: "C · 决策", hours: 3, color: C.purple, items: [
        "和导师、mentor、家人讨论",
        "最终决定",
      ]},
    ],
    internship: "N/A",
    embodied: "Offer 谈判是一个被严重低估的技能——好好谈可以多 10-30% 收入，不谈就是平白损失。有底气的来源是你有多个 offer",
    milestone: "收到 2+ offer；签 offer 意向书",
    resources: ["薪资谈判指南"],
  },
  {
    week: 53, phase: 6,
    title: "Offer 定下 + 研二方向",
    overview: "offer 尘埃落定，开始思考研二方向",
    tracks: [
      { name: "A · 入职准备", hours: 3, color: C.red, items: [
        "入职前的技术准备（新公司 tech stack）",
        "了解入职手续、签协议",
      ]},
      { name: "B · 研二方向", hours: 5, color: C.purple, items: [
        "研二研究方向 brainstorm：深挖 VLA？转世界模型？人形？",
        "和导师讨论 1-2 次",
      ]},
      { name: "C · 休整", hours: 4, color: C.gold, items: [
        "完成求职后，休整 1-2 周",
        "身体/心理调整",
      ]},
    ],
    internship: "N/A",
    embodied: "求职结束是一个小 milestone，不是终点——研究生还有 2 年，新 offer 6 月才入职或转正。这时候的 mental reset 非常重要",
    milestone: "offer 定下；研二方向草稿",
    resources: ["研二规划模板"],
  },
  {
    week: 54, phase: 6,
    title: "研一下 · 课业冲刺",
    overview: "学期末课业考试，保 GPA",
    tracks: [
      { name: "A · 课业", hours: "主时间", color: C.red, items: [
        "期末考试复习",
        "课程项目收尾",
        "论文作业（如有）",
      ]},
      { name: "B · 研究保持", hours: 4, color: C.purple, items: [
        "保持每周 1 篇论文精读",
        "研究 notebook 持续更新",
      ]},
      { name: "C · 新 offer 准备", hours: 2, color: C.teal, items: [
        "如果 offer 是暑期实习，开始准备入职",
      ]},
    ],
    internship: "已结束",
    embodied: "课业不是陪玩，好的课程（机器人学/ML/CV）和你研究方向直接相关。好好学至少能为研二/博士打基础",
    milestone: "期末课业顺利完成",
    resources: ["期末复习策略"],
  },
  {
    week: 55, phase: 6,
    title: "研一下 · 课业+技术保持",
    overview: "课业主线，技术保持",
    tracks: [
      { name: "A · 课业", hours: "主时间", color: C.red, items: [
        "考试周",
      ]},
      { name: "B · 技术保持", hours: 5, color: C.blue, items: [
        "即使在考试，保持 1 小时/天的具身智能学习",
        "订阅的 VLA 最新动态不中断",
      ]},
      { name: "C · 新公司准备", hours: 3, color: C.teal, items: [
        "如是暑期实习 offer，开始预习新公司技术栈",
      ]},
    ],
    internship: "N/A",
    embodied: "技术学习不是「脉冲式」的——哪怕 1 小时也要每天都学。一旦完全停下，10 天后重启需要很大能量",
    milestone: "课业结束",
    resources: ["考试攻略"],
  },
  {
    week: 56, phase: 6,
    title: "学期结束 · 项目复兴",
    overview: "学期结束，有时间重新投入项目和研究",
    tracks: [
      { name: "A · 项目 #3 完美化", hours: 6, color: C.teal, items: [
        "项目 #3 做一个终极版",
        "如果 RSS 中稿，集成最终实验",
      ]},
      { name: "B · 研二启动", hours: 5, color: C.purple, items: [
        "研二研究方向敲定",
        "相关论文大量精读",
      ]},
      { name: "C · 技术博客", hours: 2, color: C.red, items: [
        "写年度总结博客",
      ]},
    ],
    internship: "新 offer 准备 or 回到实验室",
    embodied: "学期结束到新 offer 入职之间的空窗期，是整理和重启的黄金时间。不要白白浪费",
    milestone: "项目 #3 终极版；研二方向",
    resources: ["方向选择框架"],
  },
  {
    week: 57, phase: 6,
    title: "研究集中冲刺",
    overview: "暑假启动，研究集中期",
    tracks: [
      { name: "A · 研二研究", hours: 8, color: C.red, items: [
        "新方向的第一个实验",
        "文献综述",
      ]},
      { name: "B · 新 offer 准备", hours: 3, color: C.teal, items: [
        "如是暑期实习，6 月入职准备",
      ]},
      { name: "C · 整理", hours: 2, color: C.gold, items: [
        "15 个月完整笔记整理",
      ]},
    ],
    internship: "新实习 or 研究",
    embodied: "从求职模式切回研究模式——你已经通过求职市场的考验，现在可以更 confident 地做研究",
    milestone: "新研究方向启动；第一个小实验",
    resources: ["导师对话记录"],
  },
  {
    week: 58, phase: 6,
    title: "研究深化 + 总结",
    overview: "研究稳定，开始总结 15 个月",
    tracks: [
      { name: "A · 研究", hours: 8, color: C.red, items: [
        "实验稳定推进",
        "论文笔记库持续更新",
      ]},
      { name: "B · 15 个月总结", hours: 4, color: C.purple, items: [
        "写一份 15 个月学习报告（5000 字）",
        "这份报告会是你研二/博士 statement of purpose 的素材",
      ]},
      { name: "C · 社区", hours: 1, color: C.teal, items: [
        "参与 LeRobot 等开源社区 1-2 个 PR",
      ]},
    ],
    internship: "新实习/研究",
    embodied: "15 个月总结不只是回顾，更是对未来规划的奠基——你走过的每一步都能照亮下一步的方向",
    milestone: "15 个月总结报告初稿",
    resources: ["优秀的学习总结范例"],
  },
  {
    week: 59, phase: 6,
    title: "新阶段适应",
    overview: "新环境（实习或研究）适应",
    tracks: [
      { name: "A · 新工作/研究", hours: "主", color: C.red, items: [
        "快速融入新环境",
        "建立新的技术学习节奏",
      ]},
      { name: "B · 反思", hours: 3, color: C.purple, items: [
        "对比新公司/新方向 vs 之前的实习公司，思考差异",
      ]},
      { name: "C · 兴趣", hours: 2, color: C.teal, items: [
        "开始感兴趣的 side project",
      ]},
    ],
    internship: "新 offer",
    embodied: "新阶段的前 2 周决定你在新组的印象——快速展示能力、快速融入",
    milestone: "新环境站稳脚跟",
    resources: ["新人快速融入方法"],
  },
  {
    week: 60, phase: 6,
    title: "完成 · 15 个月毕业",
    overview: "作战手册完成，新旅程开始",
    tracks: [
      { name: "A · 最终总结", hours: 5, color: C.teal, items: [
        "15 个月总结报告定稿，发到博客",
        "记录重大 lessons learned",
      ]},
      { name: "B · 下一份路线图", hours: 4, color: C.purple, items: [
        "写研二 18 个月路线图（学习本手册的模板）",
        "定义新的 milestone",
      ]},
      { name: "C · 庆祝", hours: 2, color: C.gold, items: [
        "犒赏自己",
        "分享给未来的自己和同路人",
      ]},
    ],
    internship: "已就绪",
    embodied: "15 个月前的你和现在的你已经不是同一个人。你完成了一个完整的学习周期——从零到行业 early expert。但这不是终点，是真正入门这个领域的起点",
    milestone: "作战手册正式 closure；下一阶段路线图完成",
    resources: ["你 15 个月前写下的这份路线图"],
  },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function PhaseTag({ phaseId }) {
  const ph = PHASES.find(p => p.id === phaseId);
  return (
    <span style={{
      fontSize: "9px", padding: "1px 6px", borderRadius: "2px",
      background: ph.color + "22", border: `1px solid ${ph.color}44`, color: ph.color,
      fontWeight: "800", letterSpacing: "0.05em",
    }}>{ph.label}</span>
  );
}

function WeekCard({ w, isActive, onClick }) {
  const ph = PHASES.find(p => p.id === w.phase);
  const totalHours = w.tracks.reduce((sum, t) => sum + (typeof t.hours === "number" ? t.hours : 0), 0);
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        border: `1px solid ${isActive ? ph.color + "66" : C.border}`,
        background: isActive ? ph.color + "0d" : C.card,
        borderRadius: "5px",
        padding: "12px 14px",
        transition: "all 0.15s",
      }}
    >
      <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "5px" }}>
        <span style={{
          fontSize: "11px", fontWeight: "900", color: isActive ? ph.color : C.muted,
          minWidth: "28px",
        }}>W{w.week}</span>
        <PhaseTag phaseId={w.phase} />
        <span style={{ fontSize: "11px", fontWeight: "700", color: isActive ? "#eee" : "#888", lineHeight: "1.3", flex: 1 }}>
          {w.title}
        </span>
      </div>
      <div style={{ fontSize: "10px", color: C.muted, marginLeft: "36px" }}>
        🎯 {w.milestone.length > 48 ? w.milestone.slice(0, 46) + "…" : w.milestone}
      </div>
      {totalHours > 0 && (
        <div style={{ fontSize: "9px", color: C.dim, marginLeft: "36px", marginTop: "2px" }}>
          ⏱ 约 {totalHours}h / 周
        </div>
      )}
    </div>
  );
}

function TrackBlock({ track }) {
  return (
    <div style={{
      marginBottom: "10px",
      padding: "12px 14px",
      background: track.color + "08",
      border: `1px solid ${track.color}22`,
      borderLeft: `3px solid ${track.color}`,
      borderRadius: "0 4px 4px 0",
    }}>
      <div style={{
        display: "flex", gap: "8px", alignItems: "center",
        marginBottom: "8px", paddingBottom: "6px",
        borderBottom: `1px solid ${track.color}22`,
      }}>
        <span style={{
          fontSize: "11px", fontWeight: "800", color: track.color,
          letterSpacing: "0.05em",
        }}>{track.name}</span>
        <span style={{
          fontSize: "9px", color: track.color, opacity: 0.7,
          marginLeft: "auto",
          padding: "1px 6px", borderRadius: "2px",
          background: track.color + "15", border: `1px solid ${track.color}33`,
        }}>
          {typeof track.hours === "number" ? `${track.hours}h/周` : track.hours}
        </span>
      </div>
      <ul style={{ margin: 0, padding: "0 0 0 14px" }}>
        {track.items.map((item, i) => (
          <li key={i} style={{
            fontSize: "11.5px", color: "#888", marginBottom: "4px", lineHeight: "1.65",
          }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Section({ label, color, children }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <div style={{
        fontSize: "9px", color: color, letterSpacing: "0.3em", fontWeight: "800",
        marginBottom: "8px", paddingBottom: "6px",
        borderBottom: `1px solid ${color}22`,
      }}>{label}</div>
      {children}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [filterPhase, setFilterPhase] = useState(0);
  const [searchQ, setSearchQ] = useState("");

  const w = WEEKS.find(w => w.week === selectedWeek);
  const ph = PHASES.find(p => p.id === w.phase);

  const filteredWeeks = WEEKS.filter(wk => {
    const matchPhase = filterPhase === 0 || wk.phase === filterPhase;
    const matchSearch = searchQ === "" ||
      wk.title.includes(searchQ) ||
      (wk.overview && wk.overview.includes(searchQ)) ||
      wk.tracks.some(t => t.items.some(it => it.includes(searchQ)));
    return matchPhase && matchSearch;
  });

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'JetBrains Mono','Courier New',monospace", color: C.text, display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <div style={{ padding: "24px 32px 18px", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
        <div style={{ fontSize: "9px", color: C.blue, letterSpacing: "0.4em", marginBottom: "6px" }}>
          V5 · 个人成长主导 · 60周完整并行版
        </div>
        <h1 style={{ fontSize: "clamp(18px,2.5vw,26px)", fontWeight: "900", margin: "0 0 4px", color: "#f0f0f0", letterSpacing: "-0.03em" }}>
          具身智能算法工程师 · 周计划
        </h1>
        <div style={{ fontSize: "11px", color: C.muted }}>
          每周多 track 并行：机器人学 / ML/DL / 论文 / 真机 / 项目 · 立即可执行
        </div>

        {/* Phase pills */}
        <div style={{ display: "flex", gap: "6px", marginTop: "14px", flexWrap: "wrap" }}>
          <button onClick={() => setFilterPhase(0)} style={{
            background: filterPhase === 0 ? "#ffffff15" : "none",
            border: `1px solid ${filterPhase === 0 ? "#ffffff33" : C.border}`,
            color: filterPhase === 0 ? "#ccc" : C.muted,
            padding: "4px 12px", borderRadius: "3px", cursor: "pointer",
            fontSize: "10px", fontFamily: "inherit", fontWeight: "700",
          }}>全部 60 周</button>
          {PHASES.map(p => (
            <button key={p.id} onClick={() => setFilterPhase(filterPhase === p.id ? 0 : p.id)} style={{
              background: filterPhase === p.id ? p.color + "22" : "none",
              border: `1px solid ${filterPhase === p.id ? p.color + "66" : C.border}`,
              color: filterPhase === p.id ? p.color : C.muted,
              padding: "4px 12px", borderRadius: "3px", cursor: "pointer",
              fontSize: "10px", fontFamily: "inherit", fontWeight: "700",
            }}>{p.label} · {p.title}</button>
          ))}
        </div>

        <input
          value={searchQ}
          onChange={e => setSearchQ(e.target.value)}
          placeholder="搜索关键词（如：IK / Transformer / 阻抗 / VLA / 面试）"
          style={{
            marginTop: "12px",
            background: C.card, border: `1px solid ${C.border}`,
            color: C.text, padding: "7px 14px", borderRadius: "4px",
            fontSize: "11px", fontFamily: "inherit", width: "380px",
            outline: "none",
          }}
        />
      </div>

      {/* Body: two-column */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* Left: week list */}
        <div style={{
          width: "320px", flexShrink: 0,
          borderRight: `1px solid ${C.border}`,
          overflowY: "auto",
          padding: "16px 14px",
        }}>
          <div style={{ fontSize: "10px", color: C.muted, marginBottom: "10px", letterSpacing: "0.2em" }}>
            显示 {filteredWeeks.length} 周 / 共 60 周
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {filteredWeeks.map(wk => (
              <WeekCard
                key={wk.week}
                w={wk}
                isActive={selectedWeek === wk.week}
                onClick={() => setSelectedWeek(wk.week)}
              />
            ))}
          </div>
        </div>

        {/* Right: week detail */}
        <div style={{ flex: 1, overflowY: "auto", padding: "22px 30px" }}>

          {/* Week header */}
          <div style={{ marginBottom: "22px", paddingBottom: "16px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "6px", flexWrap: "wrap" }}>
              <span style={{
                fontSize: "26px", fontWeight: "900", color: ph.color,
                fontVariantNumeric: "tabular-nums",
              }}>W{w.week}</span>
              <PhaseTag phaseId={w.phase} />
              <span style={{ fontSize: "10px", color: C.muted }}>{ph.range}</span>
            </div>
            <div style={{ fontSize: "19px", fontWeight: "800", color: "#f0f0f0", marginBottom: "6px", lineHeight: "1.3" }}>
              {w.title}
            </div>
            {w.overview && (
              <div style={{ fontSize: "12px", color: "#999", lineHeight: "1.6", fontStyle: "italic", marginBottom: "4px" }}>
                {w.overview}
              </div>
            )}
            <div style={{ fontSize: "10px", color: C.dim }}>{ph.deadline}</div>
          </div>

          {/* Parallel Tracks */}
          <Section label="🎯 本周并行推进" color={ph.color}>
            {w.tracks.map((t, i) => (
              <TrackBlock key={i} track={t} />
            ))}
          </Section>

          {/* Internship integration */}
          {w.internship && (
            <Section label="🏢 实习工作融入" color={C.gold}>
              <div style={{
                padding: "12px 14px",
                background: C.gold + "08",
                border: `1px solid ${C.gold}22`,
                borderLeft: `3px solid ${C.gold}`,
                borderRadius: "0 4px 4px 0",
                fontSize: "12px", color: "#aaa", lineHeight: "1.75",
              }}>
                {w.internship}
              </div>
            </Section>
          )}

          {/* Embodied significance */}
          <Section label="🤖 与具身智能的意义" color={ph.color}>
            <div style={{
              padding: "14px 16px",
              background: ph.color + "0e",
              border: `1px solid ${ph.color}2a`,
              borderLeft: `3px solid ${ph.color}`,
              borderRadius: "0 5px 5px 0",
              fontSize: "12px", color: "#aaa", lineHeight: "1.8",
            }}>
              {w.embodied}
            </div>
          </Section>

          {/* Resources */}
          {w.resources && w.resources.length > 0 && (
            <Section label="📚 推荐资源" color={C.muted}>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {w.resources.map((r, i) => (
                  <div key={i} style={{
                    fontSize: "11px", color: "#555", padding: "5px 10px",
                    background: "#111", border: `1px solid ${C.border}`,
                    borderRadius: "3px",
                  }}>→ {r}</div>
                ))}
              </div>
            </Section>
          )}

          {/* Milestone */}
          <div style={{
            padding: "16px 20px",
            background: ph.color + "12",
            border: `1px solid ${ph.color}44`,
            borderRadius: "5px",
            marginTop: "4px",
          }}>
            <div style={{ fontSize: "9px", color: ph.color, letterSpacing: "0.25em", marginBottom: "6px", fontWeight: "800" }}>
              ✅ 本周里程碑
            </div>
            <div style={{ fontSize: "13px", color: "#ddd", fontWeight: "700", lineHeight: "1.5" }}>
              {w.milestone}
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", gap: "10px", marginTop: "24px", paddingTop: "18px", borderTop: `1px solid ${C.border}` }}>
            {selectedWeek > 1 && (
              <button onClick={() => setSelectedWeek(selectedWeek - 1)} style={{
                background: C.card, border: `1px solid ${C.border}`,
                color: C.muted, padding: "8px 16px", borderRadius: "4px",
                cursor: "pointer", fontSize: "11px", fontFamily: "inherit",
              }}>← W{selectedWeek - 1}</button>
            )}
            {selectedWeek < 60 && (
              <button onClick={() => setSelectedWeek(selectedWeek + 1)} style={{
                background: ph.color + "18", border: `1px solid ${ph.color}44`,
                color: ph.color, padding: "8px 20px", borderRadius: "4px",
                cursor: "pointer", fontSize: "11px", fontFamily: "inherit", fontWeight: "700",
                marginLeft: "auto",
              }}>W{selectedWeek + 1} →</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
