define(function() {

    function DefaultConfig() {
        this.config = {
            size: 200,
            parent: 'body',
            thickness: 10,
            primaryColor: '#005E00',
            secondaryColor: '#4DD027',
            colors: [],
            fontFamily: 'sans-serif',
            titleSize: '20px',
            sumSize: '28px',
            descriptionSize: '14px',
            view: 'simple',

            ratioSize: '24px' // Carousel only
        };
    }

   DefaultConfig.prototype.merge = function(customConfig) {
       for (var prop in customConfig) {
           if (customConfig.hasOwnProperty(prop)) {
               this.config[prop] = customConfig[prop];
           }
       }
       return this.config;
   };

    return DefaultConfig;

});