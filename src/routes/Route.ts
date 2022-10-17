import IRoute from "./interface_route/IRoute";

class Route {
  useRoute(route: IRoute): void {
    route.routes();
  }
}

export default Route;
