define(function() {

    function DefaultConfig() {
        this.config = {
            width: 200,
            height: 200,
            parent: 'body',
            paddingTop: 30,
            paddingRight: 30,
            paddingBottom: 30,
            paddingLeft: 30,
            spacing: 30
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