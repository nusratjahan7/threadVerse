import HeroBanner from "@/components/homepage/Banner";
import CategorySearch from "@/components/homepage/CategorySearch";
import NewThisWeek from "@/components/homepage/NewThisWeek";


export default function Home() {
  return (
    <div className="">
      <CategorySearch />
      <HeroBanner />
      <NewThisWeek />
    </div>
  );
}
