This is a speculative re-tooling of the SuperRentals tutorial in terms of shipped, proposed and plausible future Ember features.

# Step 1: Routing

## Today

```js
import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about');
});

export default Router;
```

## Proposed

```js
export default [
  'about'
];
```

# Step 2: Templates

## Today

app/templates/about.hbs

```handlebars
<div class="jumbo">
  <div class="right tomster"></div>
  <h2>About Super Rentals</h2>
  <p>
    The Super Rentals website is a delightful project created to explore Ember.
    By building a property rental site, we can simultaneously imagine traveling
    AND building Ember applications.
  </p>
</div>
```

## Proposed

src/ui/routes/about.gbs

```gbs
<div class="jumbo">
  <div class="right tomster"></div>
  <h2>About Super Rentals</h2>
  <p>
    The Super Rentals website is a delightful project created to explore Ember.
    By building a property rental site, we can simultaneously imagine traveling
    AND building Ember applications.
  </p>
</div>
```

# Step 3: Contact Route

## Today

app/templates/contact.hbs

```handlebars
<div class="jumbo">
  <div class="right tomster"></div>
  <h2>Contact Us</h2>
  <p>
    Super Rentals Representatives would love to help you<br>
    choose a destination or answer any questions you may have.
  </p>
  <address>
    Super Rentals HQ
    <p>
      1212 Test Address Avenue<br>
      Testington, OR 97233
    </p>
    <a href="tel:503.555.1212">+1 (503) 555-1212</a><br>
    <a href="mailto:superrentalsrep@emberjs.com">superrentalsrep@emberjs.com</a>
  </address>
</div>
```

## Proposed

src/ui/routes/contact.gbs

```gbs
<div class="jumbo">
  <div class="right tomster"></div>
  <h2>Contact Us</h2>
  <p>
    Super Rentals Representatives would love to help you<br>
    choose a destination or answer any questions you may have.
  </p>
  <address>
    Super Rentals HQ
    <p>
      1212 Test Address Avenue<br>
      Testington, OR 97233
    </p>
    <a href="tel:503.555.1212">+1 (503) 555-1212</a><br>
    <a href="mailto:superrentalsrep@emberjs.com">superrentalsrep@emberjs.com</a>
  </address>
</div>
```

# Step 4: Adding a Link

## Today

app/templates/about.hbs

```handlebars {9-11}
<div class="jumbo">
  <div class="right tomster"></div>
  <h2>About Super Rentals</h2>
  <p>
    The Super Rentals website is a delightful project created to explore Ember.
    By building a property rental site, we can simultaneously imagine traveling
    AND building Ember applications.
  </p>
  {{#link-to "contact" class="button"}}
    Contact Us
  {{/link-to}}
</div>
```

## Proposed

src/ui/routes/about.gbs

```gbs {9-11}
<div class="jumbo">
  <div class="right tomster"></div>
  <h2>About Super Rentals</h2>
  <p>
    The Super Rentals website is a delightful project created to explore Ember.
    By building a property rental site, we can simultaneously imagine traveling
    AND building Ember applications.
  </p>
  <Link @route="contact" class="button">
    Contact Us
  </Link>
</div>
```

# Step 5: Another Link

## Today

app/templates/contact.hbs

```handlebars {16-18}
<div class="jumbo">
  <div class="right tomster"></div>
  <h2>Contact Us</h2>
  <p>
    Super Rentals Representatives would love to help you<br>
    choose a destination or answer any questions you may have.
  </p>
  <address>
    Super Rentals HQ
    <p>
      1212 Test Address Avenue<br>
      Testington, OR 97233
    </p>
    <a href="tel:503.555.1212">+1 (503/) 555-1212</a><br>
    <a href="mailto:superrentalsrep@emberjs.com">superrentalsrep@emberjs.com</a>
  </address>
  {{#link-to "about" class="button"}}
    About
  {{/link-to}}
</div>
```

## Proposed

src/ui/routes/contact.hbs

```gbs {17-19}
<div class="jumbo">
  <div class="right tomster"></div>
  <h2>Contact Us</h2>
  <p>
    Super Rentals Representatives would love to help you<br>
    choose a destination or answer any questions you may have.
  </p>
  <address>
    Super Rentals HQ
    <p>
      1212 Test Address Avenue<br>
      Testington, OR 97233
    </p>
    <a href="tel:503.555.1212">+1 (503/) 555-1212</a><br>
    <a href="mailto:superrentalsrep@emberjs.com">superrentalsrep@emberjs.com</a>
  </address>
  <Link @route="about" class="button">
    Contact Us
  </Link>
</div>
```

# Step 6: A Rentals Route

## Today

app/templates/rentals.hbs

```handlebars
<div class="jumbo">
  <div class="right tomster"></div>
  <h2>Welcome!</h2>
  <p>We hope you find exactly what you're looking for in a place to stay.</p>
  {{#link-to "about" class="button"}}
    About Us
  {{/link-to}}
</div>
```

## Proposed

src/ui/routes/rentals.gbs

```gbs
<div class="jumbo">
  <div class="right tomster"></div>
  <h2>Welcome!</h2>
  <p>We hope you find exactly what you're looking for in a place to stay.</p>
  <Link @route="about" class="button">
    About Us
  </Link>
</div>
```

# Step 7: Index Route

## Today

app/routes/index.js

```js
import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    this.replaceWith('rentals');
  }
});
```

## Proposed

src/router.js

```js
export default {
  routes: [
    'about',
    'contacts',
    'rentals',
  ],
  index: 'rentals'
}
```

# Step 8: Adding a Banner

## Today

app/templates/application.hbs

```handlebars
<div class="container">
  <div class="menu">
    {{#link-to "index"}}
      <h1>
        <em>SuperRentals</em>
      </h1>
    {{/link-to}}
    <div class="links">
      {{#link-to "about" class="menu-about"}}
        About
      {{/link-to}}
      {{#link-to "contact" class="menu-contact"}}
        Contact
      {{/link-to}}
    </div>
  </div>
  <div class="body">
    {{outlet}}
  </div>
</div>
```

## Proposed

src/ui/routes/application.gbs

```gbs
<div class="container">
  <div class="menu">
    <Link @route="index">
      <h1>
        <em>SuperRentals</em>
      </h1>
    </Link>
    <div class="links">
      <Link @route="about" class="menu-about">
        About
      </Link>
      <Link @route="contact" class="menu-contact">
        Contact
      </Link>
    </div>
  </div>
  <div class="body">
    {{outlet}}
  </div>
</div>
```

# Step 9: Model Hook

## Today

app/routes/rentals.js

```js
import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return [{
      id: 'grand-old-mansion',
      title: 'Grand Old Mansion',
      owner: 'Veruca Salt',
      city: 'San Francisco',
      category: 'Estate',
      bedrooms: 15,
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
      description: 'This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests.'
    }, {
      id: 'urban-living',
      title: 'Urban Living',
      owner: 'Mike TV',
      city: 'Seattle',
      category: 'Condo',
      bedrooms: 1,
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg',
      description: 'A commuters dream. This rental is within walking distance of 2 bus stops and the Metro.'
    }, {
      id: 'downtown-charm',
      title: 'Downtown Charm',
      owner: 'Violet Beauregarde',
      city: 'Portland',
      category: 'Apartment',
      bedrooms: 3,
      image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg',
      description: 'Convenience is at your doorstep with this charming downtown rental. Great restaurants and active night life are within a few feet.'
    }];
  }
});
```

## Proposed

src/ui/routes/rentals.gbs

```gbs
--- ts ---
const model = [{
  id: 'grand-old-mansion',
  title: 'Grand Old Mansion',
  owner: 'Veruca Salt',
  city: 'San Francisco',
  category: 'Estate',
  bedrooms: 15,
  image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
  description: 'This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests.'
}, {
  id: 'urban-living',
  title: 'Urban Living',
  owner: 'Mike TV',
  city: 'Seattle',
  category: 'Condo',
  bedrooms: 1,
  image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg',
  description: 'A commuters dream. This rental is within walking distance of 2 bus stops and the Metro.'
}, {
  id: 'downtown-charm',
  title: 'Downtown Charm',
  owner: 'Violet Beauregarde',
  city: 'Portland',
  category: 'Apartment',
  bedrooms: 3,
  image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg',
  description: 'Convenience is at your doorstep with this charming downtown rental. Great restaurants and active night life are within a few feet.'
}];

--- hbs ---
<div class="jumbo">
  <div class="right tomster"></div>
  <h2>Welcome!</h2>
  <p>We hope you find exactly what you're looking for in a place to stay.</p>
  <Link @route="about" class="button">
    About Us
  </Link>
</div>

{{#each model as |rental|}}
  <article class="listing">
    <div class="details">
      <h3>{{rental.title}}</h3>
      <div class="detail owner">
        <span>Owner:</span> {{rental.owner}}
      </div>
      <div class="detail type">
        <span>Type:</span> {{rental.category}}
      </div>
      <div class="detail location">
        <span>Location:</span> {{rental.city}}
      </div>
      <div class="detail bedrooms">
        <span>Number of bedrooms:</span> {{rental.bedrooms}}
      </div>
    </div>
  </article>
{{/each}}
```

# Step 10: Async Fetching

## Today

app/routes/rentals.js

```js
import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return fetch('/rentals.json');
  }
});
```

## Proposed

src/ui/routes/rentals.gbs

```gbs
--- ts ---
export default class {
  get rentals() {
    return fetch('/rentals.json');
  }
}

--- hbs ---
<div class="jumbo">
  <div class="right tomster"></div>
  <h2>Welcome!</h2>
  <p>We hope you find exactly what you're looking for in a place to stay.</p>
  <Link @route="about" class="button">
    About Us
  </Link>
</div>

{{#await this.rentals}}
  {{when :Loading}}
    <LoadingSpinner />

  {{when :Loaded as |rentals|}}
    {{#each rentals as |rental|}}
      <article class="listing">
        <div class="details">
          <h3>{{rental.title}}</h3>
          <div class="detail owner">
            <span>Owner:</span> {{rental.owner}}
          </div>
          <div class="detail type">
            <span>Type:</span> {{rental.category}}
          </div>
          <div class="detail location">
            <span>Location:</span> {{rental.city}}
          </div>
          <div class="detail bedrooms">
            <span>Number of bedrooms:</span> {{rental.bedrooms}}
          </div>
        </div>
      </article>
    {{/each}}
{{/await}}
```

# Step 11. Adding a Simple Component

## Today

app/templates/components/rental-listing.hbs

```handlebars
<article class="listing">
  <img src={{this.rental.image}} alt="">
  <div class="details">
    <h3>{{this.rental.title}}</h3>
    <div class="detail owner">
      <span>Owner:</span> {{this.rental.owner}}
    </div>
    <div class="detail type">
      <span>Type:</span> {{this.rental.category}}
    </div>
    <div class="detail location">
      <span>Location:</span> {{this.rental.city}}
    </div>
    <div class="detail bedrooms">
      <span>Number of bedrooms:</span> {{this.rental.bedrooms}}
    </div>
  </div>
</article>
```

app/templates/rentals.hbs

```handlebars
<div class="jumbo">
  <div class="right tomster"></div>
  <h2>Welcome!</h2>
  <p>
    We hope you find exactly what you're looking for in a place to stay.
  </p>
  {{#link-to "about" class="button"}}
    About Us
  {{/link-to}}
</div>

{{#each this.model as |rental|}}
  {{rental-listing rental=rentalUnit}}
{{/each}}
```

## Proposed

src/ui/routes/rentals/rental-listing.gbs

```gbs
<article class="listing">
  <img src={{@rental.image}} alt="">
  <div class="details">
    <h3>{{@rental.title}}</h3>
    <div class="detail owner">
      <span>Owner:</span> {{@rental.owner}}
    </div>
    <div class="detail type">
      <span>Type:</span> {{@rental.category}}
    </div>
    <div class="detail location">
      <span>Location:</span> {{@rental.city}}
    </div>
    <div class="detail bedrooms">
      <span>Number of bedrooms:</span> {{@rental.bedrooms}}
    </div>
  </div>
</article>
```

src/ui/routes/rentals.gbs

```gbs
--- ts ---
import { RentalListing } from './components/rental-listing';

export default class {
  get rentals() {
    return fetch('/rentals.json');
  }
}

--- hbs ---
<div class="jumbo">
  <div class="right tomster"></div>
  <h2>Welcome!</h2>
  <p>We hope you find exactly what you're looking for in a place to stay.</p>
  <Link @route="about" class="button">
    About Us
  </Link>
</div>

{{#await this.rentals}}
  {{when :Loading}}
    <LoadingSpinner />

  {{when :Loaded as |rentals|}}
    {{#each rentals as |rental|}}
      <RentalListing @rental={{rental}}>
    {{/each}}
{{/await}}
```