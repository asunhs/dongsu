module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            dist: {
                options: {
                    transform: [
                        ["babelify", {
                            loose: "all"
                        }]
                    ]
                },
                files: {
                    "./dist/module.js": ["./src/index.js"]
                }
            }
        },
        copy: {
            main: {
                src: "src/index.html",
                dest: "index.html"
            },
            css: {
                src: "src/main.css",
                dest: "dist/main.css"
            },
            img: {
                dest: 'dist/img',
                src:['**/*'],
                cwd: 'src/img',
                expand: true
            }
        },
        watch: {
            scripts: {
                files: ["./src/**/*.js"],
                tasks: ["browserify"]
            },
            resource: {
                files: ["./src/**/*.html", "./src/**/*.css"],
                tasks: ["copy"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");

    grunt.registerTask("default", ["watch"]);
    grunt.registerTask("build", ["browserify", "copy"]);
};