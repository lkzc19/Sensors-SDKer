# Change Log

本项目所有显著变更都将记录在此文件中。

其格式基于 [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)，
且本项目遵循 [语义化版本控制](https://semver.org/spec/v2.0.0.html)。

## [0.2.0] 2025-06-29

### Added

- 新增对事件名、distinct_id、login_id随机生成功能；
- 新增点击上报按钮反馈；

### Fixed

- 修复上报事件类型下拉选项错误；
- 修复自定义属性上报会上报空字符串问题；

## [0.1.0] 2025-06-29

### Added

- 新增神策SDK各种所有类型事件的上报，包含event、profile、item；
- 新增logout调用，即清除id相关的缓存；