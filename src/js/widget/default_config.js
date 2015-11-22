define(function() {

    function DefaultConfig() {
        this.config = {
            size: 200,
            parent: 'body',
            spacing: 30,
            thickness: 10,
            primaryColor: '#005E00',
            secondaryColor: '#4DD027',
            colors: [],
            fontFamily: 'Arial',
            titleSize: '20px',
            sumSize: '28px'
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