import Link from "next/link";
import { TabItemComponentProps } from ".";
import Icon from "../../components/Icon";

const TabItemComponent = (props: TabItemComponentProps) => {
  const { label, icon, link, zone } = props;

  const TabButton = () => (
    <button className="flex cursor-pointer items-center justify-center rounded-md px-5 py-2 text-xl tracking-wider focus:outline-none lg:flex">
      {icon && (
        <span className="mr-1 h-6 w-6">
          <Icon name={icon} />
        </span>
      )}
      {label}
    </button>
  );


  console.log("object :>> ", { zone, link });

  if (zone && link?.external) {
    return (
      <a
        href={link.internal || link.external}
        rel="noopener noreferrer"
        target="_blank"
        className="flex items-center"
      >
        <TabButton />
      </a>
    );
  }

  if (link?.internal) {
    return (
      <Link href={link.internal} className="flex h-full w-full items-center">
        <TabButton />
      </Link>
    );
  }

  return <TabButton />;
};

export default TabItemComponent;
