import { _ as _extends } from "@swc/helpers/_/_extends";
import { _ as _object_without_properties_loose } from "@swc/helpers/_/_object_without_properties_loose";
import { jsx as _jsx } from "react/jsx-runtime";
import cn from 'clsx';
const Quote = (_param)=>{
    var { children, className } = _param, props = _object_without_properties_loose(_param, [
        "children",
        "className"
    ]);
    // All of these tailwind classes are watched by `tailwind.config.js` in the Next.js app
    const rootClassName = cn('border-l-4 pl-4', 'font-normal leading-6 text-base', className);
    return /*#__PURE__*/ _jsx("p", _extends({
        className: rootClassName
    }, props, {
        children: children
    }));
};
export default Quote;
