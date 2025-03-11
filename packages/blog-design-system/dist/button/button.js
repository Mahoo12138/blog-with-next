import { _ as _extends } from "@swc/helpers/_/_extends";
import { _ as _object_without_properties_loose } from "@swc/helpers/_/_object_without_properties_loose";
import { jsx as _jsx } from "react/jsx-runtime";
import cn from 'clsx';
const Button = (_param)=>{
    var { children, className, secondary = false } = _param, props = _object_without_properties_loose(_param, [
        "children",
        "className",
        "secondary"
    ]);
    // All of these tailwind classes are watched by `tailwind.config.js` in the Next.js app
    const rootClassName = cn('relative inline-flex items-center justify-center cursor-pointer', 'no-underline py-0 px-3.5 rounded-md border border-solid border-black', 'text-base font-medium outline-none select-none align-middle', 'whitespace-nowrap leading-10 shadow-md transition-colors', secondary ? 'bg-white text-black' : 'bg-black text-white', className);
    return /*#__PURE__*/ _jsx("button", _extends({
        className: rootClassName
    }, props, {
        children: children
    }));
};
export default Button;
