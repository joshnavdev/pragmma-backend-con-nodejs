import { DIContainer } from 'rsdi';

class CustomContainer extends DIContainer {
  static #instance;

  static getInstance() {
    if (!CustomContainer.#instance) {
      CustomContainer.#instance = new CustomContainer();
    }

    return CustomContainer.#instance;
  }

  addClass = (name, Class, dependencies) => {
    super.add(name, (container) => {
      const resolvedDependencies = dependencies.map((dependency) => container[dependency]);

      return new Class(...resolvedDependencies);
    });
  };
}

export default CustomContainer;
