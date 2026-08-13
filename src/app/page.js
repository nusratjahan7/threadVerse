import HeroBanner from "@/components/homepage/Banner";
import CategorySearch from "@/components/homepage/CategorySearch";
import FashionApproach from "@/components/homepage/FashionApproach";
import NewThisWeek from "@/components/homepage/NewThisWeek";


export default function Home() {
  return (
    <div className="">
      <CategorySearch />
      <HeroBanner />
      <NewThisWeek />
      <FashionApproach />
    </div>
  );
}
