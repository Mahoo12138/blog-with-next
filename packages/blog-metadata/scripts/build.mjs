import { execSync } from 'child_process'

// 自动获取当前包的真实工作目录
console.log('自动获取当前包的真实工作目录', process.env.INIT_CWD, '\\', process.cwd());

const INIT_CWD = process.env.INIT_CWD || process.cwd()

try {
    execSync(`contentlayer2 build`, {
        stdio: 'inherit',
        encoding: 'utf-8',
        env: {
            ...process.env,
            
            INIT_CWD: INIT_CWD // 显式注入环境变量
        }
    })
} catch (error) {
    process.exit(1)
}