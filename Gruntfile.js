module.exports = function( grunt ) {
    
    // load time-grunt and all grunt plugins found in the package.json
    require( 'time-grunt' )( grunt );
    require( 'load-grunt-tasks' )( grunt );
    
    
    grunt.initConfig({
        
        sass: {                              
            dist: {                            
                options: {                       
                  style: 'expanded'
                },
                files: {                         
                  'css/main.css': '_sass/main.scss'
                }
            }
        }, //end sass

        
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

        
        concat : {
            dist : {
                src : [ 'css/*.css' ],
                dest : 'css/the-big-one.css',
            }
        }, //end concat

        
        cssmin : {
            dist : {
                src : 'css/main.css',
                dest : 'css/main.min.css'
            }
        }, //end cssmin

        
        watch : {
            files : [ 
                        'index.html',
                        'about.html',
                        'archive.html',
                        'contact.html',
                        '_sass/*.scss',
                        '_layouts/*.html',
                        '_includes/*.html',
                        '_posts/*.md',
                        '_config.yml', 
                    ],
            tasks : [ 
                        'sass'
                    ],
            options : {
                spawn : false,
                interrupt : true,
                atBegin : true,
                livereload : true
            }
        },//end watch
        
        
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
    grunt.registerTask( 'serve', ['sass', 'shell:jekyllServe' ] );
    grunt.registerTask( 'test', [ 'csslint' ] );
    grunt.registerTask( 'build', [ 'sass', 'concat', 'cssmin', 'shell:jekyllBuild' ] );
    grunt.registerTask( 'deploy', [ 'shell:ghPages' ] );

};