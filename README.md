# 具身智能 · 研0 · 15个月个人成长作战手册 v5

> v4 的修订版。重要调整:**机器人学基础前置 + 多线并行学习**
> 触发原因:用户正在调试真机,需要立即应用的机器人学知识前置,ML 学习不延后但与机器人学并行推进
> 战略框架同 v4(个人成长为主、实习为加速器、EMG 不研究),本版只调整学习顺序
> 本文档于 2026.4.24 版本化

---

## 零、本次调整的核心逻辑

### 原 v4 的问题

v4 把 ML/DL 基础放在 Month 1-3,把机器人学数学放在 Month 5。但你 **现在正在真机上调试机械臂和灵巧手**,这意味着:

- 机器人学知识(SE(3)、IK、URDF、pinocchio)是你**本周就需要的**
- 等到 Month 5 学,你错过了"手里有硬件,学一个知识点立刻能验证"的黄金窗口
- 另一边,Month 1-3 如果只做 ML,你又白白浪费了真机接触机会

### v5 的调整原则

**核心原则:有硬件在手时学机器人学,没硬件的晚上/周末学 ML**

时间分配调整:

| 时段 | 内容 | 理由 |
|------|------|------|
| 白天实习 | 机器人学实战(调试+IK+ROS2) | 手边有硬件,实战驱动学习 |
| 工作日晚上 | ML/DL 理论+代码 | 电脑前学 ML 最高效 |
| 周末 | 整合+补短+论文 | 连续时间做大块任务 |

### 学习节奏矫正

**v4 的节奏**:月度单主题 → "这个月只学 PyTorch"
**v5 的节奏**:月度三四条并行线 → "这个月同时推进:机器人学 + PyTorch + 数学 + 论文"

这更符合人的学习规律——大脑不擅长纯单线程,多线程交织反而记得牢。

---

## 一、近期 2 周优先执行清单(立即开战)

### 本周(W1,2026.4.24-5.1)

**机器人学冲刺(7-10 小时)**

- **周一-周二**:3Blue1Brown 线代第 7-14 集(SVD、特征值)——这是 IK 数学基础
- **周三**:Modern Robotics Ch3(SE(3)、SO(3)、齐次变换)精读
- **周四**:pinocchio 安装,跑 tutorial 前 3 个例子
- **周五**:用 pinocchio 加载 A7Lite URDF,FK 计算末端位姿

**开发环境搭建(3-4 小时)**

- uv 虚拟环境 + PyTorch 装好(`torch.cuda.is_available() == True`)
- GitHub 建个人仓库 `embodied-ai-learning`,README 贴 v5 路线
- 新建 `work_log.md` 每日记录(今天做了什么、卡在哪、明天计划)

**实习工作(主时间)**

- 继续调试机械臂和灵巧手——这就是最好的"理论验证"
- 每次卡住一个问题,回头找对应的理论点学习

### 下周(W2,2026.5.1-5.8)

**机器人学深化(8-10 小时)**

- Jacobian 矩阵数学 + 数值 IK 理论(伪逆 vs 阻尼最小二乘)
- 用 pinocchio 写一个 IK 求解器,给 A7Lite 任意目标末端位姿 → 输出关节角
- 四元数、旋转矩阵、轴角、欧拉角的互转练习

**PyTorch 破冰(6-7 小时)**

- d2l.ai 第 2-3 章,敲代码
- MLP 训练 MNIST(从 numpy 版到 PyTorch 版)

**论文阅读(2 小时)**

- 精读一篇:**Attention is All You Need** 或 **ResNet**(任选一个开始)

---

## 二、15 个月时间主轴(v4 骨架保留)

```
  2026
  ├─ 4月下旬 ━━━━━ Phase 0 开启 · 机器人学 + ML 并行启动
  ├─ 5月    ━━━━━ SE(3) + Jacobian + PyTorch
  ├─ 6月    ━━━━━ 真机控制深化 + Transformer
  │
  ├─ 7月    ━━━━━ Phase 1 开启 · 模仿学习 + 强化学习
  ├─ 8月    ━━━━━ ACT + Diffusion Policy + 仿真
  ├─ 9月    ━━━━━ 【入学】生态整合 + 扩散模型深入
  │
  ├─ 10月   ━━━━━ Phase 2 开启 · VLA 主流模型
  ├─ 11月   ━━━━━ π0 / SmolVLA + 多模态融合
  ├─ 12月   ━━━━━ Sim2Real + HIL-SERL
  2027
  ├─ 1月    ━━━━━ 前沿拓展 + 拳头项目
  ├─ 2月    ━━━━━ 研究能力深化
  │
  ├─ 3月    ━━━━━ Phase 3 开启 · 求职冲刺
  ├─ 4-6月  ━━━━━ 项目深化 + 面试 + 求职
```

### Phase 大纲(v5 版)

| Phase | 月份 | 主题 | 时长 | 核心交付 |
|-------|------|------|------|---------|
| Phase 0 | M1-3 | 机器人学 + ML 地基 | ~330h | 能用 pinocchio 做 IK、手写 Transformer、真机跑通 |
| Phase 1 | M4-6 | 模仿学习 + 仿真 + 入学 | ~280h | ACT / DP 在真机+仿真都跑通 |
| Phase 2 | M7-11 | VLA 专精 | ~500h | 3 个作品(含真机 VLA) |
| Phase 3 | M12-15 | 求职冲刺 | ~400h | offer + 研二方向 |

---

## 三、Phase 0 · 机器人学 + ML 地基并行(Month 1-3)

**主题**:机器人学从 Day 1 就用起来,ML 基础同步推进,Transformer 在 Month 3 手写完成

### Month 1(2026.4下-5中)· 机器人学强势启动

**主目标**:建立机器人学核心概念,同时 ML 环境和数学地基到位

#### 每周时间分配(约 15h/周)

| Track | 周投入 | 本月目标 |
|-------|--------|---------|
| A. 机器人学(**主线**) | 7h | SE(3)/SO(3)、FK、pinocchio 入门 |
| B. ML 基础 | 5h | PyTorch 环境 + MLP + 自动求导 |
| C. 数学轻复建 | 2h | 线代(SVD/特征值),配合机器人学用 |
| D. 实习映射 | 工作时段 | 把 Track A 所学直接用到 A7Lite |

#### Track A · 机器人学(7h/周)

- **Week 1**:SE(3)、SO(3)、齐次变换(Modern Robotics Ch3)
- **Week 2**:旋转表示四兄弟互转(欧拉角/旋转矩阵/四元数/轴角)
- **Week 3**:Forward Kinematics 推导 + pinocchio 加载 URDF
- **Week 4**:Jacobian 矩阵,物理含义 + 求解方法

**推荐资源**:

- Modern Robotics(Lynch & Park)Ch3 - 免费 PDF
- Pinocchio 官方 tutorial
- 台大林沛群《机器人学》Ch1-3(B 站,中文)

#### Track B · ML 基础(5h/周)

- **Week 1**:开发环境搭建(uv + PyTorch + wandb)
- **Week 2**:d2l.ai 第 1-2 章(预备知识、线性神经网络)
- **Week 3**:MLP 训练 MNIST,numpy → PyTorch 两版
- **Week 4**:自动求导机制,手写计算图(Karpathy micrograd)

#### Track C · 数学轻复建(2h/周)

- **重点**:3Blue1Brown 线代第 7-14 集(SVD、特征值、投影)
- 为什么:SVD 在 IK 伪逆、特征值在稳定性分析都用得上
- **跳过**:微积分复习(你有基础)、测度论、泛函

#### Track D · 实习工作融入

你正在做的调试工作,用 Track A 学到的知识去理解:

- 调 IK 时:用你学的 Jacobian 理论分析为什么收敛慢
- 调 URDF 时:理解 DH 参数和 A7Lite 的实际配置
- 调整坐标系时:用 SE(3) 思维画图

**每天写 work_log**:今天调试遇到的问题,对应到哪个理论知识点

#### 本月里程碑

- [ ] 能给 A7Lite 任意关节角→末端位姿(FK),误差 <1e-6
- [ ] 能讲清楚 SE(3) 是什么,四种旋转表示的优缺点
- [ ] MNIST 训练到 98%+,能独立写训练循环
- [ ] `work_log.md` 每日更新,GitHub 每周 5+ commits

---

### Month 2(2026.5中-6中)· IK 深入 + ROS2 + PyTorch 加速

**主目标**:能在 A7Lite 真机上做完整控制循环,PyTorch 达到能写 CNN 的程度

#### 每周时间分配(约 15h/周)

| Track | 周投入 | 本月目标 |
|-------|--------|---------|
| A. 机器人学 | 6h | 数值 IK 实现 + ROS2 入门 |
| B. ML(CV+CNN) | 6h | CNN、ViT、图像分类项目 |
| C. 论文阅读 | 2h | 每周 1 篇精读 |
| D. 数学(概率) | 1h | MLE、高斯、KL divergence 基础 |

#### Track A · 机器人学(6h/周)

- **Week 1**:数值 IK 实现(Jacobian 伪逆 + DLS 阻尼最小二乘)
- **Week 2**:奇异构型分析、IK 收敛性测试
- **Week 3**:ROS2 基础(节点、topic、service)
- **Week 4**:A7Lite + ROS2 集成,写完整控制节点

**实操项目**:

- 用 pinocchio + 你写的 IK,让 A7Lite 末端追踪一个圆形轨迹
- 写一个 ROS2 service:输入末端目标 → 输出关节角

#### Track B · ML CV + CNN(6h/周)

- **Week 1-2**:d2l.ai 第 4-7 章(CNN 核心)
- **Week 3**:ResNet 精读 + 实现
- **Week 4**:CIFAR-10 到 85%+

#### Track C · 论文阅读(2h/周,本月重点)

每周精读一篇,建立阅读习惯:

- Week 1: ResNet
- Week 2: Attention is All You Need
- Week 3: ViT
- Week 4: CLIP

精读笔记模板(必须写):
- Motivation(要解决什么问题)
- Method(核心方法 3-5 句话)
- Key Insight(关键 idea 1-2 条)
- Limitation(局限性)

#### Track D · 数学(1h/周,轻量)

- MLE / MAP 思想
- 高斯分布多元版
- KL divergence 定义
- 目标:看懂 VAE 和扩散模型论文时不懵

#### 本月里程碑

- [ ] A7Lite 真机完成一个完整任务(如轨迹追踪 + 简单抓取)
- [ ] ROS2 能独立写 Publisher/Subscriber/Service
- [ ] CIFAR-10 训练到 85%+
- [ ] 精读 4 篇论文,笔记成体系

---

### Month 3(2026.6中-7初)· 真机控制深化 + Transformer 手写

**主目标**:Transformer 达到代码级吃透,真机能做遥操和力控初步

#### 每周时间分配(约 15h/周)

| Track | 周投入 | 本月目标 |
|-------|--------|---------|
| A. 机器人学(控制) | 5h | 阻抗控制仿真 + 真机遥操 |
| B. ML(Transformer) | 7h | **手写 Self-Attention + minGPT** |
| C. 论文阅读 | 2h | 扩散/DL 基础 |
| D. 工具链 | 1h | wandb / diffusers 库 |

#### Track A · 机器人学 - 控制与遥操(5h/周)

- **Week 1-2**:阻抗控制理论复习(你有基础)+ Pybullet 仿真
- **Week 3**:A7Lite 力矩接口 + 重力补偿(如有接入)
- **Week 4**:主从臂遥操工程调试(配合实习)

#### Track B · ML - Transformer(7h/周,本月核心)

这个月的**钉子任务**:手写 Transformer

- **Week 1**:Karpathy《Neural Networks: Zero to Hero》micrograd 部分
- **Week 2**:Karpathy makemore,理解 character-level language model
- **Week 3**:**手写 Self-Attention(50 行内,不调库)**
- **Week 4**:minGPT 级别实现,训练小语言模型

**验收标准**:手写版 Self-Attention 与 PyTorch `nn.MultiheadAttention` 输出误差 <1e-5

#### Track C · 论文(2h/周)

- Week 1: DINOv2
- Week 2: DDPM(扩散模型基础)
- Week 3: DDIM
- Week 4: Flow Matching

#### Track D · 工具链(1h/周)

- 学会用 HuggingFace transformers / diffusers 的基本 API
- 学会 wandb 跟踪实验
- 学会 uv 管理复杂依赖

#### 本月里程碑

- [ ] 50 行内手写 Self-Attention,与官方误差 <1e-5
- [ ] 能训练一个 minGPT 级别的小模型(字符级语言模型)
- [ ] 阻抗控制仿真跑通,理解 K/D 矩阵物理含义
- [ ] 实习的遥操工作有一定 ownership

#### Phase 0 结束硬标准(M3 末)

- [ ] **机器人学**:能独立写 IK 求解器,能跑通 A7Lite ROS2 控制,懂 SE(3)/Jacobian
- [ ] **ML**:能手写 Transformer,能训练 CNN/小 LM,能用 wandb 做实验
- [ ] **数学**:线代扎实,概率够用
- [ ] **论文**:精读 10+ 篇,笔记库成体系
- [ ] **项目**:至少 1 个 GitHub 项目有完整 README 和 demo

---

## 四、Phase 1 · 模仿学习 + 仿真 + 入学(Month 4-6)

**主题**:从"能跑 DL"升级到"能在真机和仿真上跑具身学习算法"

### Month 4(2026.7初-8初)· ACT 上手 + RL 基础

#### 每周时间分配(约 15h/周)

| Track | 周投入 | 本月目标 |
|-------|--------|---------|
| A. 模仿学习(**主线**) | 6h | ACT 精读 + LeRobot 跑通 |
| B. 强化学习 | 5h | PPO + SAC 在 MuJoCo |
| C. 真机/仿真桥接 | 3h | MuJoCo 加载 A7Lite |
| D. 论文 | 1h | 本月 1-2 篇具身核心论文 |

#### Track A · 模仿学习(6h/周,本月主线)

- **Week 1**:BC、DAgger 基础理论
- **Week 2-3**:ACT 精读(ICRA 2023)
- **Week 4**:LeRobot 框架跑通 ACT(PushT 仿真 benchmark)

#### Track B · 强化学习(5h/周)

- **Week 1-2**:Spinning Up,PPO 理论 + CleanRL 实现
- **Week 3-4**:在 MuJoCo 上训 PPO 解决 LunarLander、Ant

#### Track C · 真机/仿真(3h/周)

- Week 1: MuJoCo 基础教程
- Week 2: 加载 A7Lite URDF 到 MuJoCo
- Week 3-4: 在 MuJoCo 里写一个 push task,为 ACT 采数据做准备

#### Track D · 论文(1h/周)

- Week 1: ACT
- Week 2: PPO
- Week 3: SAC
- Week 4: BC 经典(如 ALVINN 历史回顾)

#### 本月里程碑

- [ ] ACT 在 PushT 仿真跑通,达到论文 benchmark
- [ ] PPO 在 2+ MuJoCo 任务收敛
- [ ] MuJoCo 能加载 A7Lite,为后续仿真铺路

---

### Month 5(2026.8初-9初)· Diffusion Policy + 真机项目 #1

#### 每周时间分配(约 15h/周)

| Track | 周投入 | 本月目标 |
|-------|--------|---------|
| A. Diffusion Policy(**主线**) | 7h | DP 代码吃透 + 真机跑通 |
| B. 仿真深入 | 4h | Isaac Lab / ManiSkill 入门 |
| C. RL 进阶 | 2h | SAC + HIL-SERL 了解 |
| D. 论文 | 2h | 扩散+仿真相关 |

#### 🔥 项目 #1 启动

**"ACT vs Diffusion Policy on LinkerHand"**

- 用 A7Lite + L20 Lite,采 50-100 条真机演示
- 用 LeRobot 框架训 ACT 和 Diffusion Policy
- 对比效果,写技术报告
- GitHub 发布,技术博客同步

#### 本月里程碑

- [ ] Diffusion Policy 代码吃透,能修改网络结构
- [ ] Isaac Lab 基础跑通
- [ ] 项目 #1 初版完成(GitHub + 博客草稿)

---

### Month 6(2026.9初-10初)· 入学过渡 + 扩散模型数学深入

**本月关键事件**:研究生入学,时间结构变化(实习改兼职)

#### 每周时间分配(约 10-12h/周,因课业总时间下降)

| Track | 周投入 | 本月目标 |
|-------|--------|---------|
| A. 扩散数学 | 4h | DDPM → DDIM → Flow Matching 完整 |
| B. 项目 #1 完善 | 4h | 发布到 GitHub,博客定稿 |
| C. 研究生课程 | 随课 | 选对课 |
| D. 论文 | 2h | 扩散+VLA 桥接论文 |

#### 研究生选课建议

优先选:

- 机器人学(高级,含动力学/规划)
- ML / DL
- 计算机视觉

次选:

- 最优控制 / MPC
- 非线性控制

避开:

- 纯理论数学课(除非导师要求)
- 与你方向无关的工程课

#### Phase 1 结束硬标准

- [ ] ACT + Diffusion Policy 在真机+仿真都能跑
- [ ] PPO 熟练,SAC 用过
- [ ] 扩散模型数学清楚(为 Phase 2 VLA 做准备)
- [ ] 项目 #1 正式发布
- [ ] 入学过渡稳定

---

## 五、Phase 2 · VLA 专精(Month 7-11)

**主题**:每月一个核心主题,产出三个能写在简历上的项目

### Month 7(2026.10初-11初)· VLA 主流模型精读

**硬件策略**:本月开始需要云 GPU(AutoDL A100,预算 ¥300-500/月)

#### 每周时间分配(约 10-12h/周)

| Track | 周投入 | 本月目标 |
|-------|--------|---------|
| A. VLA 论文(**主线**) | 5h | 7 篇必读 |
| B. VLA 代码 | 4h | OpenVLA / SmolVLA 跑通 |
| C. 研究生课业 | 随课 | 保 A |
| D. 实习 | ~15h/周 | 对口任务 |

#### VLA 必读论文(按顺序,共 7 篇)

1. RT-1(2022)
2. RT-2(2023)
3. OpenVLA(2024)
4. π0(2024)
5. π0.5(如已发布)
6. SmolVLA(小模型,本地可跑)
7. GR00T N1.5(NVIDIA 生态)

每篇笔记要包含:

- 输入/输出格式
- 训练数据规模
- 训练配方(lr、batch、scheduler)
- Benchmark(LIBERO / CALVIN / SIMPLER)
- 在公司硬件上复现需要改什么

#### 本月里程碑

- [ ] SmolVLA 本地跑通 inference
- [ ] OpenVLA 或 π0 在云端跑 fine-tune
- [ ] 7 篇 VLA 论文笔记完成

---

### Month 8(2026.11初-12初)· π0/SmolVLA 真机 + 多模态融合

#### 🔥 项目 #2 启动

**"Real-Robot VLA Fine-tuning on LinkerHand"**

- 选 SmolVLA 或 π0 作为基座
- 在 A7Lite + L20 Lite 上采数据 fine-tune
- 完成一个自定义任务
- 如果实习涉及 Pose+Force 融合,顺手把多模态加进来

#### 本月里程碑

- [ ] 一个 VLA 在真机上跑通 fine-tune 和部署
- [ ] 项目 #2 初版完成

---

### Month 9(2026.12初-2027.1初)· Sim2Real + HIL-SERL

- Domain Randomization 实战
- HIL-SERL 论文精读 + 仓库跑通
- 项目 #2 扩展:Sim2Real 对比

#### 🔥 项目 #3 启动

**"真机 VLA + Sim2Real + HIL-SERL 微调"**——这是你的拳头项目

---

### Month 10(2027.1初-2初)· 拳头项目完成 + 前沿拓展

- 项目 #3 完成,成功率 >70%
- Demo 视频录制
- 挑一个前沿方向深入(Touch-Aware VLA / Reasoning VLA / 数据高效 VLA)

---

### Month 11(2027.2初-3初)· 研究能力深化

- 3 个项目全部上 GitHub
- 技术博客累计 3+ 篇
- 前沿论文持续跟踪
- 如果实习有论文 co-author 机会,评估投入产出

#### Phase 2 结束硬标准

- [ ] 3 个项目上 GitHub,有 README / demo 视频 / 技术报告
- [ ] 能讲清楚 Diffusion Policy、OpenVLA、π0 的架构差异
- [ ] 真机上完成端到端任务,成功率 >70%
- [ ] 精读论文累积 30+ 篇

---

## 六、Phase 3 · 求职冲刺(Month 12-15)

(同 v4,基本不变)

- **M12**:拳头项目深化 + 技术博客爆款
- **M13**:系统面试准备(算法题 + ML/DL + 具身专业面 + 项目深度)
- **M14**:投递 + 面试
- **M15**:谈 offer + 研一总结 + 研二规划

---

## 七、多线并行的执行原则(本版核心)

### 为什么要多线并行

前面提过,大脑多线程交织记得牢。但更重要的现实原因:

1. **手边资源决定学什么**——你现在有真机,就要抓紧学机器人学
2. **不同时段适合不同内容**——白天实操,晚上理论
3. **知识交叉强化**——学 SE(3) 时想到"这是不是和我学 Transformer attention 一样都是线性变换?"——这种顿悟只有并行学习才有

### 时间分配的黄金法则

**每周 15 小时个人学习**(M1-M5),按以下分配:

- **主线 40-50%**(6-7h):当月核心主题
- **副线 30%**(4-5h):另一条主要 track
- **论文 15%**(2h):每周 1-2 篇
- **工具+实践 10%**(1-2h):不新学,但保持手感

### 每周的结构化模板

**周一 2h**:本周主线新内容启动
**周二 2h**:主线继续 + 副线开始
**周三 2h**:副线深入
**周四 2h**:主线+副线整合
**周五 1h**:论文精读
**周六 4h**:大块时间做项目/复盘
**周日 2h**:泛读论文 + 计划下周

**铁律**:每周日晚上,写周报到 `work_log.md`,包括:本周完成什么、没完成什么、下周调整什么。

---

## 八、数学 + 控制复习(精简版,同 v4)

### ✅ 不需要重学
微积分、PID、Bode 图、根轨迹、状态空间、Laplace

### 🔄 需要复习(分散到 Track C)
- 线代:SVD、特征分解(Month 1)
- 概率论:MLE、MAP、KL(Month 2)
- 矩阵微积分、优化基础(Month 3)

### 🆕 需要新学(具身专用,Track A)
- SE(3)/SO(3)/李代数(Month 1)
- 四元数运算(Month 1)
- Jacobian & IK(Month 2)
- URDF、DH 参数(Month 1-2)

---

## 九、v5 vs v4 关键差异速查

| 维度 | v4 | v5 |
|------|----|----|
| 机器人学数学 | Month 5 | **Month 1 开始** |
| 每月结构 | 单主题为主 | **多线并行** |
| 时间配置 | 线性推进 | 白天机器人学 / 晚上 ML |
| Phase 0 内容 | 纯 ML 基础 | 机器人学 + ML 齐头并进 |
| 立即可用性 | 低(要等 5 个月才学机器人学) | 高(本周就能用) |
| 战略框架 | 个人成长为主 | 不变 |
| EMG 定位 | 不研究 | 不变 |
| 15 月骨架 | 4 Phase | 不变 |

---

## 十、风险与避坑(新增一条)

### 并行学习的新风险

**风险 X:多线并行变成多线烂尾**
- 每个 track 都浅尝辄止,没有任何一个深入
- **对策**:每月必须有一个"钉子任务"——Month 1 是 IK,Month 3 是手写 Transformer,Month 5 是项目 #1。钉子任务必须达成,其他可以略有滞后

**风险 Y:真机诱惑,ML 进度滞后**
- 真机有趣,看得见摸得着,容易沉迷;ML 抽象,看不见效果,容易拖
- **对策**:每周五晚上硬性检查:本周 ML 进度?如果 <60%,周六立刻补

---

## 十一、每月自检(更新版)

每月最后一天,严肃问自己:

1. 本月**机器人学**主线里程碑完成了吗?
2. 本月**ML**主线里程碑完成了吗?(不能一边完成一边滞后)
3. 本月精读了几篇论文?笔记写了吗?
4. 本月在真机上做了多少实验?(数量级?)
5. 本月 GitHub 个人 commit 数量?
6. 实习工作中,哪些任务**学到了东西**?哪些是纯劳动?
7. 能力相比上月,哪 3 点进步?(说不出 → 红灯)
8. 下月需要调整什么?

---

## 最后的话(v5 版)

**核心变化一句话**:

> v4 是"学 ML 基础,几个月后去碰机器人";v5 是"**边调机器人边学数学、晚上学 PyTorch、周末整合**"——这更真实,因为你确实就在调机器人。

**15 个月后的你**:

- 机器人学扎实(v4 和 v5 都能做到,但 v5 更早)
- ML/DL 扎实(v4 和 v5 都能做到,时间差不多)
- 真机实战丰富(v5 明显优势——从 Day 1 就在用)
- 3 个能讲的项目(不变)
- 技术博客 + 业界 network(不变)

**最重要的**:v5 让你**从第 1 周就在产出价值**——调试真机的过程本身就是学习,而不是"先学 3 个月再开始做有意义的事"。

v5 · 2026.4.24
