import Hexo from 'hexo';
import fs from 'fs';
import { join } from 'path';

let __SECRET_HEXO_INSTANCE__ = null;

export const initHexo = async () => {
    if (__SECRET_HEXO_INSTANCE__) {
        return __SECRET_HEXO_INSTANCE__;
    }
    console.log('cwd', process.cwd());
    const hexo = new Hexo(process.cwd(), {
        silent: true,
        // 在 next dev 时包含草稿
        draft: process.env.NODE_ENV !== 'production'
    });

    const dbPath = join(hexo.base_dir, 'db.json');
    if (process.env.NODE_ENV !== 'production') {
        if (fs.existsSync(dbPath)) {
            await fs.promises.unlink(dbPath);
        }
    }

    await hexo.init();
    await hexo.load();

    if (hexo._dbLoaded) {
        if (!fs.existsSync(dbPath)) {
            // if (process.env.NODE_ENV === 'production') {
                await hexo.database.save();
            // }
        }
    }

    __SECRET_HEXO_INSTANCE__ = hexo;
    return hexo;
};

initHexo()