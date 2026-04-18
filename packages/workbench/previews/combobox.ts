import '@cobalt/components/combobox';
import '@cobalt/components/icon';

export const title = '<co-combobox>';

export const html = `
  <section class="wb-section">
    <h2 class="wb-heading">Basic</h2>
    <div style="max-width: 320px;">
      <co-combobox label="Favorite fruit" name="basic-fruit">
        <co-option value="apple">Apple</co-option>
        <co-option value="banana">Banana</co-option>
        <co-option value="carrot">Carrot</co-option>
        <co-option value="date">Date</co-option>
      </co-combobox>
    </div>
  </section>

  <section class="wb-section">
    <h2 class="wb-heading">Show All on Empty</h2>
    <div style="max-width: 320px;">
      <co-combobox label="Show all on empty" name="show-all-fruit" show-all-on-empty>
        <co-option value="apple">Apple</co-option>
        <co-option value="banana">Banana</co-option>
        <co-option value="carrot">Carrot</co-option>
        <co-option value="date">Date</co-option>
      </co-combobox>
    </div>
  </section>

  <section class="wb-section">
    <h2 class="wb-heading">Multiple Selection</h2>
    <div style="max-width: 320px;">
      <co-combobox label="Pick several" name="multi-fruit" multiple show-all-on-empty>
        <co-option value="apple">Apple</co-option>
        <co-option value="banana">Banana</co-option>
        <co-option value="carrot">Carrot</co-option>
        <co-option value="date">Date</co-option>
      </co-combobox>
    </div>
  </section>

  <section class="wb-section">
    <h2 class="wb-heading">Sizes</h2>
    <div style="display: grid; gap: 16px; max-width: 320px;">
      <co-combobox label="Small" name="size-sm" size="sm" show-all-on-empty>
        <co-option value="apple">Apple</co-option>
        <co-option value="banana">Banana</co-option>
      </co-combobox>
      <co-combobox label="Medium (default)" name="size-md" size="md" show-all-on-empty>
        <co-option value="apple">Apple</co-option>
        <co-option value="banana">Banana</co-option>
      </co-combobox>
      <co-combobox label="Large" name="size-lg" size="lg" show-all-on-empty>
        <co-option value="apple">Apple</co-option>
        <co-option value="banana">Banana</co-option>
      </co-combobox>
      <co-combobox label="Extra large" name="size-xl" size="xl" show-all-on-empty>
        <co-option value="apple">Apple</co-option>
        <co-option value="banana">Banana</co-option>
      </co-combobox>
    </div>
  </section>

  <section class="wb-section">
    <h2 class="wb-heading">States</h2>
    <div style="display: grid; gap: 16px; max-width: 320px;">
      <co-combobox label="Disabled" name="disabled-fruit" disabled>
        <co-option value="apple">Apple</co-option>
        <co-option value="banana">Banana</co-option>
      </co-combobox>
      <co-combobox label="Danger" name="danger-fruit" danger>
        <co-option value="apple">Apple</co-option>
        <co-option value="banana">Banana</co-option>
      </co-combobox>
      <co-combobox label="Required" name="required-fruit" required>
        <co-option value="apple">Apple</co-option>
        <co-option value="banana">Banana</co-option>
      </co-combobox>
    </div>
  </section>

  <section class="wb-section">
    <h2 class="wb-heading">Autocomplete Modes</h2>
    <div style="display: grid; gap: 16px; max-width: 320px;">
      <co-combobox label="autocomplete=both" name="ac-both" autocomplete="both">
        <co-option value="apple">Apple</co-option>
        <co-option value="banana">Banana</co-option>
        <co-option value="carrot">Carrot</co-option>
      </co-combobox>
      <co-combobox label="autocomplete=list" name="ac-list" autocomplete="list">
        <co-option value="apple">Apple</co-option>
        <co-option value="banana">Banana</co-option>
        <co-option value="carrot">Carrot</co-option>
      </co-combobox>
      <co-combobox label="autocomplete=inline" name="ac-inline" autocomplete="inline">
        <co-option value="apple">Apple</co-option>
        <co-option value="banana">Banana</co-option>
        <co-option value="carrot">Carrot</co-option>
      </co-combobox>
      <co-combobox label="autocomplete=none" name="ac-none" autocomplete="none" show-all-on-empty>
        <co-option value="apple">Apple</co-option>
        <co-option value="banana">Banana</co-option>
        <co-option value="carrot">Carrot</co-option>
      </co-combobox>
    </div>
  </section>

  <section class="wb-section">
    <h2 class="wb-heading">Custom Icon Indicator</h2>
    <div style="display: grid; gap: 16px; max-width: 320px;">
      <co-combobox label="Star indicator" name="star-icon" show-all-on-empty>
        <co-option value="apple">
          <co-icon slot="indicator-icon" name="star" size="sm"></co-icon>
          Apple
        </co-option>
        <co-option value="banana">
          <co-icon slot="indicator-icon" name="star" size="sm"></co-icon>
          Banana
        </co-option>
        <co-option value="carrot">
          <co-icon slot="indicator-icon" name="star" size="sm"></co-icon>
          Carrot
        </co-option>
      </co-combobox>
      <co-combobox label="Check-circle indicator" name="check-icon" show-all-on-empty>
        <co-option value="apple">
          <co-icon slot="indicator-icon" name="check-circle" size="sm"></co-icon>
          Apple
        </co-option>
        <co-option value="banana">
          <co-icon slot="indicator-icon" name="check-circle" size="sm"></co-icon>
          Banana
        </co-option>
        <co-option value="carrot">
          <co-icon slot="indicator-icon" name="check-circle" size="sm"></co-icon>
          Carrot
        </co-option>
      </co-combobox>
    </div>
  </section>
`;
