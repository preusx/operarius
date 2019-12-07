module.exports = {
  plugins: [
    /**
     * postcss-selector-not
     * https://github.com/postcss/postcss-selector-not
     *
     * Transform :not() W3C CSS level 4 pseudo class to :not() CSS level 3
     * selectors.
     */
    require('postcss-selector-not'),

    /**
     * postcss-alias
     * https://github.com/seaneking/postcss-alias
     */
    require('postcss-alias'),

    /**
     * postcss-quantity-queries
     * https://github.com/pascalduez/postcss-quantity-queries
     */
    require('postcss-quantity-queries'),

    /**
     * css-mqpacker
     * https://github.com/hail2u/node-css-mqpacker
     */
    require('css-mqpacker')({
      sort: true,
    }),

    /**
     * postcss-calc
     * https://github.com/postcss/postcss-calc
     */
    require('postcss-calc'),

    /**
     * postcss-round-subpixels
     * https://github.com/himynameisdave/postcss-round-subpixels
     */
    require('postcss-round-subpixels'),

    require('autoprefixer')({}),
  ],
};
