define(function() {

    function DefaultConfig() {
        this.config = {
            width: 200,
            height: 200
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