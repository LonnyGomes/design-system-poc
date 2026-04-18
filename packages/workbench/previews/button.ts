import '@cobalt/components/button';
import '@cobalt/components/icon';

export const title = '<co-button>';

export const html = `
  <section class="wb-section">
    <h2 class="wb-heading">Variants</h2>
    <div class="wb-row">
      <co-button variant="primary">Primary</co-button>
      <co-button variant="secondary">Secondary</co-button>
      <co-button variant="danger">Danger</co-button>
      <co-button variant="success">Success</co-button>
      <co-button variant="ghost">Ghost</co-button>
    </div>
  </section>

  <section class="wb-section">
    <h2 class="wb-heading">Sizes</h2>
    <div class="wb-row" style="align-items: center">
      <co-button size="sm">Small</co-button>
      <co-button size="md">Medium</co-button>
      <co-button size="lg">Large</co-button>
    </div>
  </section>

  <section class="wb-section">
    <h2 class="wb-heading">States</h2>
    <div class="wb-row">
      <co-button>Default</co-button>
      <co-button disabled>Disabled</co-button>
      <co-button loading>Loading</co-button>
    </div>
  </section>

  <section class="wb-section">
    <h2 class="wb-heading">With Icons (slots)</h2>
    <div class="wb-row">
      <co-button variant="primary">
        <co-icon slot="prefix" name="add" size="sm"></co-icon>
        Add item
      </co-button>
      <co-button variant="secondary">
        Settings
        <co-icon slot="suffix" name="arrow-right-alt" size="sm"></co-icon>
      </co-button>
      <co-button variant="danger">
        <co-icon slot="prefix" name="delete" size="sm"></co-icon>
        Delete
      </co-button>
    </div>
  </section>

  <section class="wb-section">
    <h2 class="wb-heading">As Link</h2>
    <div class="wb-row">
      <co-button href="https://example.com" target="_blank">
        External link
        <co-icon slot="suffix" name="open-in-new" size="sm"></co-icon>
      </co-button>
    </div>
  </section>
`;
