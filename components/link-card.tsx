import { RefAttributes } from "react";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent } from "react";

export default function LinkCard({
  icon,
  title,
  description,
  href,
}: {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  description: string;
  href: string;
}) {
  const Icon = icon;
  return (
    <div className="bg-white shadow-sm rounded-xl p-5 border border-gray-100 flex flex-col">
      <div className="flex items-center mb-2">
        <Icon className="w-4 h-4 text-gray-500 mr-2" />
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      </div>
      <p className="text-base text-gray-600 mb-4">{description}</p>
      <div className="flex justify-end items-center mt-auto">
        <a
          href={href}
          className="bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium inline-block"
        >
          {title}
        </a>
      </div>
    </div>
  );
}
