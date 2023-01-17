export abstract class PluggableService<Key, PluggedServiceInterface> {
  protected pluggedServices = new Map<Key, PluggedServiceInterface>();

  plugService(key: Key, service: PluggedServiceInterface) {
    this.pluggedServices.set(key, service);
  }
}
