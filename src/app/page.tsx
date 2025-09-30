import DashboardGrid from "@/components/DashboardGrid";
import HttpTile from "@/components/tiles/HttpTile";
import LinkTile from "@/components/tiles/LinkTile";

export default function Page() {
  return (
    <>
      <main className="mx-auto max-w-7xl">
        <DashboardGrid>
          <HttpTile title="Portal" url="https://portal.ebself.loan" />
          <HttpTile title="Scrypted" url="http://192.168.50.17:8080" />
          <LinkTile title="GitHub" href="https://github.com" />
        </DashboardGrid>
      </main>
    </>
  );
}
