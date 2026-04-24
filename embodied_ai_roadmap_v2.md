# 具身智能 · 研0实习生 · 定制化作战手册 v2

> 第一版废弃。本版按你的真实情况重写。
> 角色:研0 · 自动化/控制工程 · 灵心巧手实习 · 机器人组切入
> 硬件:A7Lite 机械臂 + L20 Lite 灵巧手 + LFFG1-01 力反馈手套
> 关键节点:ICLR 2027(2026.9.25)、RSS 2027(2027.1.底)
> 本文档于 2026.4.24 版本化,每季度复盘时更新

---

## 零、战略定位(先读懂这一节)

### 你现在的独特优势(别人没有的)

1. **控制工程背景 + 灵心巧手真机 + 全职实习平台**——三位一体。全国同期学习者里这个组合不超过几百人
2. **没接触 VLA 不是劣势,是空白画布**——没有被 CNN 时代范式束缚,直接上 Transformer/Diffusion 范式
3. **EMG 方向公司也没基础**——这是空白,意味着你如果先钻进去,你就是公司该方向的 ownership 人
4. **有 ICLR/RSS 投稿目标 + 资深团队带**——研0 拿一作困难,但 co-author 论文 + 投稿流程经验,这比课程分数重要一百倍

### 你的劣势(要直面)

1. **ML/DL 零基础**——这是唯一真实的短板,其他都好补
2. **数学除微积分外有遗忘**——需要针对性复习,但控制工程底子在,4 周内能回来
3. **没摸过 VLA 代码**——4-6 月必须补上
4. **硬件没腕部相机**——会影响部分 VLA(Pi0/OpenVLA 依赖腕部视角)。**建议 4 月底就在公司提加装需求**(RealSense D405 约 ¥2500),这是你主动立功点

### 新的三阶段目标(上调)

| 节点 | 目标 | 验收 |
|------|------|------|
| 2026.9 入学时 | 公司机器人组熟练工 + VLA 工程能入门 + ICLR 投稿共著 | 开源模型在公司真机复现 + ICLR 投稿 co-author |
| 2027.1 底 | EMG 方向开拓者 + RSS 投稿贡献者 | 有 EMG→Pose/Force 的可用 pipeline + RSS 投稿 |
| 研究生毕业(~2028.6) | 2-3 篇 top conference 论文 + 顶级公司挑你 | 面试自由选 offer |

---

## 一、时间主轴与月度地图

```
  2026
  ├─ 4月下旬 ━━━━━━━━ M1 起步:硬件摸熟 + 数学复建 + PyTorch 入门
  ├─ 5月    ━━━━━━━━ M2 机器人学基础 + Retargeting 上手
  ├─ 6月    ━━━━━━━━ M3 深度学习核心 + ACT/Diffusion Policy
  ├─ 7月    ━━━━━━━━ M4 VLA 初接触 + 开源模型复现启动
  ├─ 8月    ━━━━━━━━ M5 ICLR 冲刺期(数据/实验/写作贡献)
  ├─ 9月    ━━━━━━━━ M6 ICLR 投稿 + 研究生入学过渡
  ├─ 10月   ━━━━━━━━ M7 VLA 深化 + EMG 前期调研
  ├─ 11月   ━━━━━━━━ M8 EMG 方向启动 + Sim2Real 系统化
  ├─ 12月   ━━━━━━━━ M9 RSS 投稿冲刺期
  2027
  ├─ 1月    ━━━━━━━━ M10 RSS 投稿 + 寒假冲刺
  ├─ 2-4月  ━━━━━━━━ M11-12 稳固期、下一个研究方向
```

---

## 二、【本周/本月】最紧急的动作(立即执行)

在读完这整个文档前,你这周先做:

### 这周(第一周)

1. **周一**:把公司给你的 A7Lite/L20 Lite 的 SDK 文档通读一遍,记下所有 API。哪怕暂时不懂,知道有什么
2. **周二**:在个人笔记本上建一个 `work_log.md`,从今天开始每天记:今天做了什么、卡在哪、明天要做什么(这是做研究的第一个习惯)
3. **周三**:用 uv 或 conda 搭好本地 Python 开发环境,装 PyTorch,跑通 `torch.cuda.is_available() == True`
4. **周四**:GitHub 建个人仓库,起名 `embodied-ai-learning`,README 贴这份 roadmap
5. **周五**:花 2 小时看 3Blue1Brown《线性代数的本质》前 5 集,不求懂,只求唤醒

### 这个月(M1,2026.4下-5月中,约 3 周)

详见下面 Month 1 专节。

---

## 三、月度详细作战计划

> 每月都按"**公司工作(白天)+ 个人学习(晚上+周末)**"两栏排。两边内容是咬合的,不是分裂的。

---

### Month 1 · 2026.4下 - 5.中 · 立足+启动

**主题**:硬件摸熟,数学复建,PyTorch 破冰

#### 公司工作(预计 40h/周)

- 完成 A7Lite + L20 Lite 的开发环境配置,能独立用 SDK 控制单关节
- 跟进主从臂 setup 工作,理解遥操系统数据流(力反馈手套→信号→A7Lite/L20)
- 跟 mentor 确认你 4 月的具体任务归属(主从臂 setup 哪一部分归你)
- 把遥操系统的完整代码链路读一遍,包括坐标系转换、IK 调用

**产出**:能独立跑通一次主从臂遥操,提交第一个内部 PR(哪怕是文档或小 bug)

#### 个人学习(预计 12-15h/周)

**数学复建(压缩版,共 15 小时)**

- 线性代数:3Blue1Brown 16 集,重点第 7-14 集(行列式、特征、SVD 的几何意义)。**你控制背景,这块 3 天足够**
- 概率:B 站搜"徐亦达机器学习 - 概率基础",看概率/高斯/贝叶斯部分。约 6 小时
- **跳过**:微积分复习(你已 OK)、实分析、测度论

**PyTorch 入门(共 40 小时)**

- 李沐《动手学深度学习》PyTorch 版前 5 章:[zh.d2l.ai](https://zh.d2l.ai/) · 看视频+敲代码
- 手写:MLP + CNN + 训练循环,训练 MNIST → CIFAR-10
- 建立习惯:所有实验用 wandb 记录

**机器人学快速入门(共 10 小时)**

- Modern Robotics Chapter 3 前半(刚体变换、SE(3)、齐次坐标)
- 你学过一些,这是复习+统一术语

#### Month 1 硬指标

- [ ] 能在 A7Lite 上独立运行公司任一个 demo
- [ ] 能在 PyTorch 里从头实现 MLP/CNN,CIFAR-10 准确率 >80%
- [ ] 每天有 work log,GitHub 每周有 commit
- [ ] 能用自己的话讲清楚反向传播和 SVD

---

### Month 2 · 2026.5.中 - 6.中 · 机器人学 + Retargeting 上手

**主题**:Pose Retargeting 成为你在机器人组的主战场

#### 公司工作

**Pose Retargeting** 是公司 4 月需求里比较算法化的,也是你最应该抢下来的任务(它是机器人组和 VLA 组的接口)。建议你主动跟 mentor 要这块。

核心技术路线:

- 人手/人体 → L20 Lite 的运动映射
- 常用方法:Dex-Pilot、AnyTeleop、HOMER 等
- 关键工具:`pinocchio` / `mink` (IK solver)、`dex-retargeting` (开源库)

**必跑的开源库**:[dex-retargeting](https://github.com/dexsuite/dex-retargeting) - Allegro/Shadow/Inspire 等主流灵巧手的 retargeting,你可以参考它为 L20 Lite 写适配

**必读论文**:

1. **Dex-Pilot** (Handa et al. 2020) - Teleop 经典
2. **AnyTeleop** (Qin et al. 2023) - 跨手型遥操,retargeting 主流方案
3. **HOMER** (Chen et al. 2024) - 人手→机械手 retargeting
4. **MANO** 手模型相关 paper - 你必须懂人手 21 关键点的 kinematic 树

**产出**:能跑通一个从 MediaPipe 人手关键点到 L20 Lite 关节角的 pipeline,成功率 >80%

#### 个人学习

**深度学习核心(共 40 小时)**

- d2l.ai 6-10 章(CNN/RNN/注意力/Transformer)
- **从 0 实现一个 Transformer**(Karpathy 的 minGPT 参考) - 这是铁任务
- 学会 HuggingFace transformers/diffusers 库的基本用法

**机器人学实用知识(共 15 小时)**

- 齐次变换、旋转表示(四元数/欧拉角/轴角/SO(3))必须熟练
- IK 的两种主流思路:数值解(Jacobian pseudoinverse)vs 优化解(像 CuRobo)
- 跑通 [pinocchio](https://github.com/stack-of-tasks/pinocchio) tutorial

**论文阅读习惯建立**

- 每周精读 1 篇、泛读 2 篇
- 精读笔记模板:Motivation / Method / Key Insight / Limitation / What would I do different
- 所有笔记用同一个 Notion/Obsidian 库管理

#### Month 2 硬指标

- [ ] 公司内部 Pose Retargeting 模块由你主导推进,有了初版 pipeline
- [ ] 能手写 Transformer,在小数据集上跑通
- [ ] Dex-retargeting + pinocchio 熟练使用
- [ ] 读完 4 篇 retargeting 相关论文,GitHub 仓库有技术博客记录

---

### Month 3 · 2026.6.中 - 7.中 · ACT + Diffusion Policy

**主题**:具身算法的第一个真正作品——在你的真机上跑通 ACT 和 Diffusion Policy

#### 公司工作

- Pose Retargeting 收尾,开始转 Force mapping(力反馈手套→L20 Lite 的力觉映射)
- 配合主从臂做**数据采集 pipeline**(这是最关键的基础设施之一)
- 正式向 mentor 申请:希望 7 月开始逐渐对接 VLA 组工作

#### 个人学习(这是最重要的一个月之一!)

**Week 1-2: LeRobot 框架**

- 把 [LeRobot](https://github.com/huggingface/lerobot) 代码库完整读一遍(它就 2 万行不到)
- 理解 LeRobot 的 dataset 格式、训练脚本、策略抽象
- 用 LeRobot 在 PushT 仿真上训一个 ACT,跑出论文报告成功率

**Week 3: Diffusion 模型**

- 精读 DDPM → DDIM → Classifier-Free Guidance
- 用 HuggingFace diffusers 训一个小扩散模型(MNIST 图像生成)
- 理解 flow matching(Pi0 的核心)

**Week 4: Diffusion Policy 深度**

- 精读 Diffusion Policy 论文,**每个实验细节都要懂**
- 跑通 [diffusion_policy 官方仓库](https://github.com/real-stanford/diffusion_policy)
- 对比 ACT 和 Diffusion Policy 的效果差异

**🔥 核心项目启动(Project 1):ACT/DP on LinkerHand**

目标:用 LeRobot,**在 A7Lite + L20 Lite 的真机上采数据训 ACT,完成一个简单任务(比如抓一个方块放到指定位置)**。这个项目 Month 3-4 跨度完成。

#### Month 3 硬指标

- [ ] Project 1 初版:真机采集 50-100 条演示,训出可用 ACT
- [ ] 吃透 Diffusion Policy 代码,能修改其网络结构
- [ ] 公司 Force mapping 取得进展
- [ ] 能在 10 分钟内讲清楚 Diffusion Policy 的核心 idea

---

### Month 4 · 2026.7.中 - 8.中 · VLA 接入

**主题**:正式进入 VLA 领域,开始对接公司 VLA 组工作

#### 公司工作

- 正式对接 VLA 组(应该在 7 月中之前谈妥)
- 负责 **开源 pretrained model 能力复现**(公司 VLA 组需求 1)——这是你切入 VLA 的最佳入口
- 候选模型:SmolVLA(本地可跑)、Pi0(需要云 GPU)、GR00T N1.5/1.6(需要 NVIDIA 生态)
- 推荐先复现 SmolVLA(资源消耗小,周期快)

#### 个人学习

**VLA 主流模型精读(核心)**

按此顺序读:

1. **RT-1** (Google 2022) - VLA 起点,理解 action discretization
2. **RT-2** (Google 2023) - VLM→VLA 的关键桥梁
3. **OpenVLA** (Kim et al. 2024) - 第一个开源 SOTA,工程参考价值最高
4. **Pi0** (Physical Intelligence 2024) - 当前工业界 fine-tune 最常用的基座
5. **Pi0.5** (如已开源)
6. **SmolVLA** - 小模型,适合本地实验
7. **GR00T N1.5** (NVIDIA) - 人形机器人基座

每篇论文的精读笔记必须包含:

- 输入/输出格式(图像多少路?分辨率?语言 token 化?action 如何表示?)
- 训练数据(规模、组成、增强)
- 训练配方(lr、batch size、scheduler、warmup)
- 评估 benchmark(LIBERO / CALVIN / SIMPLER / 真机)
- 你在自己硬件上想复现要改什么

**实操**:

- SmolVLA 在本地 5060 上跑 inference(需量化)
- 在 AutoDL 租 A100,跑通 OpenVLA 或 Pi0 的 fine-tune(预算 ¥300-500)
- 在 LIBERO benchmark 上评估

#### Month 4 硬指标

- [ ] 至少一个开源 VLA 在你手里的 LinkerBot 真机上跑通 inference(即便效果差)
- [ ] 读完 7 篇 VLA 论文,有完整笔记
- [ ] Project 1(ACT/DP 真机)正式完成,成为简历上的第一个 star 项目
- [ ] 公司 VLA 组工作已启动,有具体 owned 任务

---

### Month 5 · 2026.8.中 - 9.中 · ICLR 冲刺

**主题**:尽你所能贡献 ICLR 投稿(9.25 左右 deadline)

> ⚠️ 现实预期:作为研0新手,你不会是一作。你的价值在于:数据采集、实验复现、代码优化、ablation study、画图、写作的 methodology 部分。这已经非常有价值,很多二作/三作就是靠这些拿的。

#### 公司工作(集中冲刺模式)

公司投稿方向(基于需求推断):**Pose + Force 融合 VLA 架构** 或类似主题

你的贡献方式(按价值从高到低):

1. **帮主导作者跑 ablation 实验**——最常见新人贡献方式
2. **数据采集与标注**——公司有 LinkerBot 平台,你采的数据就是实验数据
3. **基线 baseline 的复现**——比如跑 OpenVLA / Pi0 作为对比基线
4. **工程优化**——GPU 利用率、训练速度、数据 loader
5. **画实验图表**——matplotlib/seaborn 高质量论文图
6. **写作方法部分的初稿**

主动跟主 author 沟通:"我可以承担 X 和 Y,我每天会同步进展"。**新人论文贡献的第一原则是主动沟通**。

#### 个人学习(保持但降速,以支持投稿为主)

- 继续精进 VLA 论文阅读
- 开始研究投稿方向相关的 SOTA 工作
- 学习 LaTeX 写作(Overleaf + ICLR template)
- 学习如何做高质量实验图表

**项目产出 #2**:一份"公司投稿方向的 Related Work Survey",即便不进论文,也是你学习的输出。

#### Month 5 硬指标

- [ ] 投稿里你做的那部分被 ack 或被列为 author
- [ ] 你自己能讲清楚这篇论文的 contribution 和对比实验
- [ ] 经历一次完整的学术投稿流程(从实验到 rebuttal 预案)

---

### Month 6 · 2026.9.中 - 10.中 · 入学过渡 + VLA 深化

**主题**:研究生入学,节奏调整,同时 VLA 工程能力深化

#### 节奏调整

入学后你的时间结构变化:

- 实习改兼职:大约 15-20h/周(具体看实验室/导师政策)
- 研究生课程:每周约 10-15h
- 导师实验室工作:看情况
- 个人学习:8-10h/周

总投入下降,所以学习必须更聚焦。

#### 公司工作

- ICLR 投稿完成,进入 rebuttal/等 review 阶段(12 月出结果)
- 启动下一个大目标:**RSS 2027 投稿**(2027.1 底,方向可能是 EMG 或 Force-aware VLA)
- 如果 ICLR 的工作涉及你,可以申请 **expand 成 RSS 长文版本**

#### 个人学习

**Sim2Real 专题(共 20 小时)**

- 精读 Domain Randomization (Tobin 2017)
- 精读 HIL-SERL (Luo et al. 2024)
- Isaac Lab 的 DR 工具上手

**LeRobot 生态深化**

- 为 LinkerBot 设备写一个 LeRobot 的 adapter(如果公司还没有)
- 贡献到 LeRobot 开源社区(issue/PR)

**研究生课程选修建议**

如果学校有,优先选:

- 机器人学(高级版,含动力学/力控/规划)
- 机器学习或深度学习
- 最优控制 / MPC(对 RL 微调有用)
- 计算机视觉(如果本科没学过)

#### Month 6 硬指标

- [ ] 入学过渡完成,时间安排稳定
- [ ] RSS 投稿的研究方向初步明确,你知道要学什么
- [ ] LinkerBot 的 LeRobot adapter 初版完成
- [ ] 精读 HIL-SERL 完成

---

### Month 7 · 2026.10.中 - 11.中 · EMG 前期调研

**主题**:EMG 作为你的研究差异化,这个月全面铺开

> 💡 重要:EMG 这块公司还没基础,这既是机会也是责任。如果你主动推进,**你可能成为公司该方向的第一个 owner**。

#### 公司工作

- 和 mentor 讨论:是否由你启动 EMG → Pose/Force 的调研
- 申请公司采购(如尚未有):Delsys Trigno 无线 EMG(工业级 ~$1-3w)、或 Myo(已停产但可二手)、或 HD-sEMG 模块
- 或者:先用公开数据集起步(见下)

#### 个人学习

**EMG 基础(生物信号处理,共 15 小时)**

- 生理学基础:肌电信号的来源、sEMG 的信号特征、频率特性(~20-500Hz)
- 信号处理:滤波(带通 10-450Hz 去工频)、包络检测、RMS、MAV
- 资源:Biosignalsnotebooks、PhysioNet 教程

**EMG → 运动解码论文精读(共 20 小时)**

关键论文方向:

- Ninapro Database 系列(公开 sEMG 数据集,必用)
- EMG → Grip Force(力解码)
- EMG → Hand Pose(手型解码)
- Deep Learning 在 sEMG 解码的应用(CNN、LSTM、Transformer)
- 结合 EMG + Vision 的多模态工作(较前沿)

搜索关键词:"sEMG hand gesture recognition deep learning"、"EMG force decoding"、"EMG-vision multimodal"

**实操**:下载 Ninapro 数据集,训练一个 sEMG → 手势分类的 baseline

**核心项目 #3 启动**:EMG → L20 Lite Pose/Force 的 pipeline 设计。这可能是 RSS 论文的核心。

#### Month 7 硬指标

- [ ] 读完 15-20 篇 EMG-ML 交叉论文,形成领域 mental map
- [ ] Ninapro baseline 跑通
- [ ] 公司内部 EMG 方向的 roadmap 由你主导撰写

---

### Month 8 · 2026.11.中 - 12.中 · EMG 启动 + Sim2Real

**主题**:EMG 实质进展 + Sim2Real 系统化

#### 公司工作

- EMG 硬件就位(如果公司采购了),开始实际采集
- 如果硬件还没到:用仿真+公开数据做前期方法论
- 参与 RSS 投稿的前期实验(如果立项了)

#### 个人学习

**Sim2Real 深化**

- 跑通 HIL-SERL 官方例子(用 Franka,但原理通用)
- 理解 co-training(sim + real 数据混合)
- Domain Randomization 实战

**世界模型入门(轻度)**

- 了解 Dreamer V3、Cosmos、Genie 的核心思想
- 重点理解 NVIDIA Cosmos 在具身数据生成里的角色
- 不深入,当作知识储备

#### Month 8 硬指标

- [ ] EMG pipeline 有 alpha 版本(即便效果不好)
- [ ] Sim2Real 工具链熟练
- [ ] RSS 投稿主线已明确,你在其中有清晰 role

---

### Month 9 · 2026.12.中 - 2027.1.中 · RSS 冲刺

**主题**:全员冲刺,论文提交

和 M5(ICLR 冲刺)类似,进入"实验+写作"闭环。这次你可能参与更多主导工作(因为经过 ICLR 一轮历练)。

**额外关注**:寒假利用好。研究生寒假 1 月中-2 月中,正好 overlap RSS deadline(1.底)。这是最集中的输出期。

---

## 四、数学 + 控制 复习压缩清单

基于你"经典+现代控制学过,忘了一些"的情况,我精确列出你需要复习+新学的内容:

### ✅ 不需要重学(你已会)

- 微积分(梯度、偏导、链式法则)
- PID、超前滞后校正
- Bode 图、根轨迹
- 状态空间基础
- Laplace 变换

### 🔄 需要复习(1-2 周搞定)

- **线性代数**:SVD、特征分解、投影、null space
- **矩阵微积分**:$\nabla_x (x^TAx)$ 这种向量对标量求导
- **概率论**:MLE、MAP、Bayesian、KL divergence
- **高斯分布**:多维高斯、条件分布、Gaussian MLE
- **优化**:梯度下降、Newton 法、凸/非凸、Lagrangian
- **信号处理**:FFT、滤波器设计(EMG 要用)

### 🆕 需要新学(具身专用)

- **SE(3) / SO(3) / 李代数**(so(3)/se(3))——机器人必备,3B1B 没有,自己找资源
  - 资源:Modern Robotics Ch3、A Tutorial on SE(3) transformations(搜)
- **四元数运算**(旋转表示)
- **Jacobian & IK**(雅可比求导、数值/优化 IK)
- **刚体动力学基础**(只需理解,不要精通;涉及 URDF 解析)
- **运动学链表示**(DH 参数 / MDH)

### 可以跳过(面试用得极少)

- 最优控制的推导(LQR 的 Riccati 方程你知道是干什么就行)
- MPC 的完整推导
- Lyapunov 稳定性深入证明
- 鲁棒控制(H∞ 等)

---

## 五、论文阅读路径(按优先级与时间)

### 必读清单(按阶段)

**Phase 1 (M1-M2,5 篇)**

1. ResNet (2015)
2. Attention is All You Need (2017)
3. ViT (2020)
4. CLIP (2021)
5. DINOv2 (2023)

**Phase 2 机器人学+IL (M2-M3,6 篇)**

6. Dex-Pilot (2020)
7. AnyTeleop (2023)
8. ACT (2023)
9. Diffusion Policy (2023)
10. DDPM (2020)
11. Flow Matching for Generative Modeling (2022)

**Phase 3 VLA (M4,7 篇)**

12. RT-1 (2022)
13. RT-2 (2023)
14. OpenVLA (2024)
15. Pi0 (2024)
16. Pi0.5 (2025 - 如有公开)
17. GR00T N1.5 (2025)
18. Octo (2024)

**Phase 4 系统 (M6-M7,6 篇)**

19. Domain Randomization (2017)
20. HIL-SERL (2024)
21. OpenX-Embodiment (2024)
22. Mobile ALOHA (2024)
23. Cosmos (2025)
24. SmolVLA

**Phase 5 EMG 交叉 (M7-M9,10-15 篇)**

25-35. 按 EMG + ML + 机器人交叉查,M7 时按需筛选

### 读论文的 10/90 原则

- 10% 论文精读(完全吃透,包括补充材料和代码)
- 30% 论文选读(读摘要+ intro + method + 实验部分)
- 60% 论文扫读(只读 abstract + figure,建立 landscape)

---

## 六、LinkerBot 硬件使用策略

### 当前配置评估

| 组件 | 型号 | 评价 |
|------|------|------|
| 机械臂 | A7Lite (7DOF) | 国产协作臂,适合室内研究 |
| 灵巧手 | L20 Lite (20DOF) | 国产顶级,带触觉,适配 VLA 研究 |
| 遥操 | LFFG1-01 力反馈手套 | 灵心巧手配套,数据采集利器 |
| 视觉 | (公司应有全局相机) | **缺腕部相机,建议立刻补** |

### 4 月内一定要推动的事:加装腕部相机

**为什么**:

- Pi0/OpenVLA/GR00T 都默认使用腕部相机(wrist camera)作为 observation
- 没有腕部相机,你复现 SOTA VLA 时效果会差 20-40%
- 近距离操作的细节(接触、抓取瞬间)全局相机看不清

**推荐**:RealSense D405(近距离深度,约 ¥2500/个)或 D435i(通用,约 ¥2000)。装在 A7Lite 末端和 L20 Lite 之间。

**你的立功点**:4 月底前主动写一个 **《关于 VLA 复现需要增加腕部相机的建议书》**,给你 mentor 和 VLA 组 lead 看。这会让他们对你的印象从"实习生"变成"懂行的实习生"。

### L20 Lite 触觉传感器的利用

这是你的王牌。L20 的触觉是多数竞品没有的(至少不是标配)。你要想办法把触觉数据整合进 VLA,这是**独立的研究方向**:

- **Touch-Aware VLA**——2026 年的前沿研究话题
- 实现路径:把触觉序列作为 VLA 的一个额外 modality
- 参考:DIME、T-Dex、Tactile-Augmented Policy Learning 等工作

---

## 七、EMG 方向深度策略

这节重要性等级 ⭐⭐⭐⭐⭐。这是你能在研究生三年里建立**个人学术身份**的方向。

### 为什么 EMG 是机会

- **人体运动数据比机器人遥操数据易采集 10-100 倍**——10 个人 1 小时能采到 1000 条演示,相当于半年遥操
- 但人和机器人有 **embodiment gap**——怎么弥合这个 gap 就是研究题目
- EMG 提供了 vision 之外的"**意图信号**"——人手肌电变化先于动作,这给了一种预测性
- 目前顶级 VLA 都基于视觉+语言,**触觉+肌电+视觉+语言**是下一步

### 研究问题(可能成为论文 topic)

1. **EMG 作为 data augmentation**:把 EMG 加进现有 VLA fine-tuning,能否提升成功率?
2. **EMG-to-Action mapping**:不用机器人,直接从人的 EMG 学策略,再迁移到机器人
3. **EMG + Vision 对比消融**:在某些任务(如精细力控)上,EMG 比 vision 更关键
4. **EMG as pretraining signal**:大规模无标注 EMG 做 self-supervised pretraining,提升下游 VLA

### 从零起步的行动清单

- **数据集**:Ninapro (公开)、UCI 机器学习库 EMG 部分、自采集(长期)
- **工具**:Python 的 `neurokit2`、`biosppy` 做信号处理
- **Baseline**:先做一个 EMG → 7 分类手势(简单任务)
- **进阶**:EMG → Grasp Type(抓握类型)→ EMG → Force(力估计)→ EMG → Joint Pose(关节角估计)→ 多模态融合

### 加入合适的社区

- X/Twitter 关注:Pulkit Agrawal、Dieter Fox、Chelsea Finn(虽然不是专做 EMG,但机器人学习圈交叉)
- 关注 IEEE Transactions on Biomedical Engineering、EMBC 会议
- 加入 Ninapro / PhysioNet 社区

---

## 八、ICLR/RSS 投稿参与策略(新人版)

### 新人(研0)的 5 条黄金法则

1. **不要追求一作**。第一篇论文能作为 co-author 参与,已经赢过 99% 同龄人
2. **主动但不越权**——申领明确的子任务,做完同步,不擅自扩大范围
3. **所有工作可复现**:代码、数据、图的生成脚本全部 version controlled。主 author 叫你改,你能 30 分钟内重跑
4. **写作阶段可以多问**——新人写方法部分通常会被大改,但改过的版本就是你学写作的教科书
5. **Rebuttal 阶段全力支持**——有时候新人做的 1-2 个额外实验能救一篇论文

### 具体可以承担的工作(按难度排)

- 基线模型复现(OpenVLA/Pi0 等跑起来)
- Ablation study 实验(改一个组件跑对比)
- 数据可视化(matplotlib 高级使用)
- 相关工作搜集整理(最容易的入门)
- 实验数据统计(t-test、置信区间、bootstrapping)
- 附录内容编写(通常分给新人)

---

## 九、风险与避坑

### 已知风险

1. **公司节奏紧,个人学习可能被挤压**
   - 对策:严格每周 **至少 10 小时** 个人学习,这是底线
   - 周六上午定为"论文日",雷打不动

2. **机器人组工作做得太舒服,拖延 VLA 学习**
   - 控制工程背景在机器人组很吃香,容易沉醉
   - 对策:设定硬边界,7 月必须启动 VLA 对接

3. **ICLR 投稿工作量失控**
   - 8-9 月可能高强度,甚至每天 12h+
   - 对策:提前 1 周 heads up,那段时间停掉个人学习非核心项

4. **灵心巧手生态资源有限**
   - 国产设备,开源社区支持不如 Franka/UR 丰富
   - 对策:主动向公司内部资深工程师学,内部知识文档要主动整理

5. **入学后实验室 vs 实习冲突**
   - 研究生导师可能不喜欢学生外面实习太投入
   - 对策:入学前就和导师沟通,谈妥长期合作预期

### 常见陷阱

- **陷阱 A:教程学习者**——永远在学新教程,不做自己的项目。规避:每月至少一个 commit 量大的自有项目
- **陷阱 B:面向论文编程**——读论文时不跑代码,读完就忘。规避:所有精读论文必须有"复现笔记",至少跑一遍官方 repo
- **陷阱 C:技术孤岛**——闷头学,不和人交流。规避:加入 1-2 个具身智能的 Discord/微信群,每月输出一篇技术博客
- **陷阱 D:理论过度**——想把 RL 数学证明都搞懂再写代码。你是工程岗,不是理论岗

---

## 十、每月自检(每月最后一天做)

回答这 8 个问题,不合格的项进下月追加任务:

1. 这个月我在 GitHub 有几个有效 commit?(少于 10 → 红灯)
2. 这个月我精读了几篇论文?有笔记吗?(少于 2 篇 → 红灯)
3. 公司内部我贡献了什么?同事是否认可?(如果没有推进任何 milestone → 黄灯)
4. 我的个人学习是否按计划?(滞后 >2 周 → 黄灯)
5. 我是否还在按 roadmap 的方向?还是跑偏了?
6. 我的能力相较上月,哪 3 点有明显进步?说不出 → 红灯
7. 我的 GitHub/博客对外展示面在进步吗?
8. 下个月我要重点补哪 1 个弱项?

---

## 附录 A:关键资源链接

### 教程与课程

- [李沐《动手学深度学习》PyTorch 版](https://zh.d2l.ai/)
- [Andrej Karpathy《Neural Networks: Zero to Hero》(YouTube)](https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ)
- [OpenAI Spinning Up in Deep RL](https://spinningup.openai.com/)
- [Modern Robotics(Lynch & Park 书+YouTube课程)](http://hades.mech.northwestern.edu/index.php/Modern_Robotics)
- [3Blue1Brown 线性代数的本质(B 站)](https://www.bilibili.com/video/BV1ys411472E)
- [Sergey Levine 的 CS 285(深度强化学习,最顶级的 RL 课)](http://rail.eecs.berkeley.edu/deeprlcourse/)

### 必须跟进的开源仓库

- [LeRobot(Hugging Face)](https://github.com/huggingface/lerobot) ⭐ 必吃透
- [Isaac Lab(NVIDIA)](https://github.com/isaac-sim/IsaacLab) ⭐ 必用
- [Diffusion Policy 原版](https://github.com/real-stanford/diffusion_policy)
- [ACT 原版](https://github.com/tonyzhaozh/act)
- [dex-retargeting](https://github.com/dexsuite/dex-retargeting) ⭐ 做 retargeting 必用
- [CleanRL](https://github.com/vwxyzjn/cleanrl)(RL 学习)
- [pinocchio](https://github.com/stack-of-tasks/pinocchio)(IK/动力学)
- [OpenVLA](https://github.com/openvla/openvla)
- [HIL-SERL](https://github.com/rail-berkeley/serl)

### 社区

- LeRobot Discord(HuggingFace 官方)
- 知乎"具身智能之心"专栏
- HuggingFace Daily Papers(每日论文推送)
- X 关注:@physical_int、@chris_j_paxton、@svlevine、@NVIDIAAI、@huggingface

---

## 附录 B:每月投入时间参考分配

### 实习期(M1-M5,4月-9月中)

- 公司全职工作:40h/周
- 个人学习(工作日晚上+周末):12-15h/周
- 总计:52-55h/周

### 入学后(M6+)

- 实习兼职:15-20h/周
- 研究生课程+实验室:25-35h/周
- 个人学习:8-12h/周
- 总计:50-65h/周

### 投稿冲刺期(M5、M9)

- 全力投入 60-80h/周,其他事延后

---

## 最后的话

你现在的处境,比大多数想"进具身智能"的人好 100 倍——因为你有真机、有平台、有团队、有节奏、还有控制背景。**别浪费这个起点**。

15 个月后,当你的同学还在 LeetCode 刷题准备投简历时,你已经有:

- 一篇 ICLR 2027 的 co-author 论文
- 一篇 RSS 2027 的 2 作或 co-author 论文
- 灵心巧手平台上完整的 VLA 复现经验
- EMG + Embodied AI 这个方向上的早期探索工作
- 一个工业界已经认识你名字的小圈子

**这样的研1 学生,具身智能行业里 Top5% 以内**。

不要焦虑节奏,按计划走,每月复盘一次。遇到问题随时过来问我。

——v2, 2026.4.24
