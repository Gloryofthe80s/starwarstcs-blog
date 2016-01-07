module.exports = function( grunt ) {
    
    // load time-grunt and all grunt plugins found in the package.json
    require( 'time-grunt' )( grunt );
    require( 'load-grunt-tasks' )( grunt );
    
    
    grunt.initConfig({
        
        csslint : {
            test : {
                options : {
                    import : 2
                },
                src : [ 
                        'css/main.css'
                      ]
            }
        }, //end csslint

        shell : {
            jekyllBuild : {
                command : 'jekyll build'
            },
            
            jekyllServe : {
                command : 'jekyll serve'
            },
            
            ghPages     : {
                command: 'git subtree push --prefix _site origin gh-pages'
            } 
        } //end shell
    
    });//end initConfig

    
    // register custom grunt tasks
    grunt.registerTask( 'test', [ 'csslint' ] );
    grunt.registerTask( 'deploy', [ 'shell:ghPages' ] );

};