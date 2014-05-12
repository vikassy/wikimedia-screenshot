# Mediawiki::Selenium

Several MediaWiki extensions share code that makes it easy to run Selenium
tests. This gem makes it easy to update the shared code.

## Installation

To run the Selenium tests you will have to install Ruby. Look at the `Gemfile`
file for the exact required version. You also have to install the latest
versions of RubyGems and Firefox (the default browser in which the tests run).
The easiest way to install Ruby on Linux/Unix/Mac is [RVM](https://rvm.io/) and
on Windows [RubyInstaller](http://rubyinstaller.org/).

    cd /tests/browser
    gem update --system
    gem install bundler
    bundle install

If you're not using RVM to manage your Ruby versions, you will need to run the
commands as root (using `sudo`).

Environment variables `MEDIAWIKI_USER` and `MEDIAWIKI_PASSWORD` are required for
tests tagged `@login`. For local testing, create a test user on your local wiki
and export the user and password as the values for those variables.
For example:

    export MEDIAWIKI_USER=<username here> # Linux/Unix/Mac
    set MEDIAWIKI_USER=<username here> # Windows Command Prompt
    $env:MEDIAWIKI_USER="<username here>" # Windows PowerShell

    export MEDIAWIKI_PASSWORD=<password here> # Linux/Unix/Mac
    set MEDIAWIKI_PASSWORD=<password here> # Windows Command Prompt
    $env:MEDIAWIKI_PASSWORD="<password here>" # Windows PowerShell

## Usage

Run the tests with `bundle exec cucumber`, this should start Firefox.

By default the tests run at en.wikipedia.beta.wmflabs.org. If you want to run
the tests elsewhere, set the `MEDIAWIKI_URL` environment variable. For example:

    export MEDIAWIKI_URL=http://commons.wikimedia.beta.wmflabs.org/wiki/ # Linux/Unix/Mac
    set MEDIAWIKI_URL=http://commons.wikimedia.beta.wmflabs.org/wiki/ # Windows Command Prompt
    $env:MEDIAWIKI_URL="http://commons.wikimedia.beta.wmflabs.org/wiki/" # Windows PowerShell

To run a single test file:

    bundle exec cucumber features/FEATURE_NAME.feature

To run a single test scenario, put a colon and the line number (NN) on which
the scenario begins after the file name:

    bundle exec cucumber features/FEATURE_NAME.feature:NN

You can use a different browser with the `BROWSER` env variable, the fastest is
probably PhantomJS, a headless browser:

    export BROWSER=phantomjs # Linux/Unix/Mac
    set BROWSER=phantomjs # Windows Command Prompt
    $env:BROWSER="internet_explorer" # Windows PowerShell

By default, the browser will close itself at the end of every scenario. If you
want the browser to stay open, set the environment variable `KEEP_BROWSER_OPEN`
to `true`:

    export KEEP_BROWSER_OPEN=true # Linux/Unix/Mac
    set KEEP_BROWSER_OPEN=true # Windows Command Prompt
    $env:KEEP_BROWSER_OPEN="true" # Windows PowerShell

## Screenshots

You can get screenshots on failures by setting the environment
variable `SCREENSHOT_FAILURES` to `true`. Screenshots will be written under the
`screenshots` directory relatively to working directory. The
`SCREENSHOT_FAILURES_PATH` environment variable lets you override
the destination path for screenshots. Example:

    SCREENSHOT_FAILURES=true SCREENSHOT_FAILURES_PATH="/tmp/screenshots" bundle exec cucumber

## Update your Gemfile

In your repository, the `Gemfile` specifies dependencies and `Gemfile.lock` defines
the whole dependency tree. To update it simply run:

    bundle update

It will fetch all dependencies and update the `Gemfile.lock` file, you can then
commit back both files.

## Links

mediawiki_selenium gem: [Gerrit](https://gerrit.wikimedia.org/r/#/admin/projects/mediawiki/selenium), [GitHub](https://github.com/wikimedia/mediawiki-selenium), [RubyGems](https://rubygems.org/gems/mediawiki_selenium), [Code Climate](https://codeclimate.com/github/wikimedia/mediawiki-selenium)

If not stated differently, Selenium tests are in `/tests/browser` folder.

Repositories that use the gem:

1. CirrusSearch: [Gerrit](https://gerrit.wikimedia.org/r/#/admin/projects/mediawiki/extensions/CirrusSearch), [GitHub](https://github.com/wikimedia/mediawiki-extensions-CirrusSearch), [Jenkins](https://wmf.ci.cloudbees.com/view/cs/), [Code Climate](https://codeclimate.com/github/wikimedia/mediawiki-extensions-CirrusSearch)
2. ContentTranslation: [Gerrit](https://gerrit.wikimedia.org/r/#/admin/projects/mediawiki/extensions/ContentTranslation), [GitHub](https://github.com/wikimedia/mediawiki-extensions-ContentTranslation), [Jenkins](https://wmf.ci.cloudbees.com/view/cx/), [Code Climate](https://codeclimate.com/github/wikimedia/mediawiki-extensions-ContentTranslation)
3. Flow: [Gerrit](https://gerrit.wikimedia.org/r/#/admin/projects/mediawiki/extensions/Flow), [GitHub](https://github.com/wikimedia/mediawiki-extensions-Flow), [Jenkins](https://wmf.ci.cloudbees.com/view/flow/), [Code Climate](https://codeclimate.com/github/wikimedia/mediawiki-extensions-Flow)
4. MobileFrontend: [Gerrit](https://gerrit.wikimedia.org/r/#/admin/projects/mediawiki/extensions/MobileFrontend), [GitHub](https://github.com/wikimedia/mediawiki-extensions-MobileFrontend), [Jenkins](https://wmf.ci.cloudbees.com/view/mf/), [Code Climate](https://codeclimate.com/github/wikimedia/mediawiki-extensions-MobileFrontend)
5. MultimediaViewer: [Gerrit](https://gerrit.wikimedia.org/r/#/admin/projects/mediawiki/extensions/MultimediaViewer), [GitHub](https://github.com/wikimedia/mediawiki-extensions-MultimediaViewer), [Jenkins](https://wmf.ci.cloudbees.com/view/mv/), [Code Climate](https://codeclimate.com/github/wikimedia/mediawiki-extensions-MultimediaViewer)
6. Translate: [Gerrit](https://gerrit.wikimedia.org/r/#/admin/projects/mediawiki/extensions/Translate), [GitHub](https://github.com/wikimedia/mediawiki-extensions-Translate), [Jenkins](https://wmf.ci.cloudbees.com/view/tr/), [Code Climate](https://codeclimate.com/github/wikimedia/mediawiki-extensions-Translate)
7. TwnMainPage: [Gerrit](https://gerrit.wikimedia.org/r/#/admin/projects/mediawiki/extensions/TwnMainPage), [GitHub](https://github.com/wikimedia/mediawiki-extensions-TwnMainPage), [Jenkins](https://wmf.ci.cloudbees.com/view/tw/), [Code Climate](https://codeclimate.com/github/wikimedia/mediawiki-extensions-TwnMainPage)
8. UniversalLanguageSelector: [Gerrit](https://gerrit.wikimedia.org/r/#/admin/projects/mediawiki/extensions/UniversalLanguageSelector), [GitHub](https://github.com/wikimedia/mediawiki-extensions-UniversalLanguageSelector), [Jenkins](https://wmf.ci.cloudbees.com/view/uls/), [Code Climate](https://codeclimate.com/github/wikimedia/mediawiki-extensions-UniversalLanguageSelector)
9. UploadWizard: [Gerrit](https://gerrit.wikimedia.org/r/#/admin/projects/mediawiki/extensions/UploadWizard), [GitHub](https://github.com/wikimedia/mediawiki-extensions-UploadWizard), [Jenkins](https://wmf.ci.cloudbees.com/view/uw/), [Code Climate](https://codeclimate.com/github/wikimedia/mediawiki-extensions-UploadWizard)
10. VisualEditor: [Gerrit](https://gerrit.wikimedia.org/r/#/admin/projects/mediawiki/extensions/VisualEditor), [GitHub](https://github.com/wikimedia/mediawiki-extensions-VisualEditor), [Jenkins](https://wmf.ci.cloudbees.com/view/ve/), [Code Climate](https://codeclimate.com/github/wikimedia/mediawiki-extensions-VisualEditor), `/modules/ve-mw/test/browser` folder
11. Wikibase: [Gerrit](https://gerrit.wikimedia.org/r/#/admin/projects/mediawiki/extensions/Wikibase), [GitHub](https://github.com/wikimedia/mediawiki-extensions-Wikibase), [Jenkins](http://wdjenkins.wmflabs.org/ci/), [Code Climate](https://codeclimate.com/github/wikimedia/mediawiki-extensions-Wikibase)
12. WikiLove: [Gerrit](https://gerrit.wikimedia.org/r/#/admin/projects/mediawiki/extensions/WikiLove), [GitHub](https://github.com/wikimedia/mediawiki-extensions-WikiLove), [Jenkins](https://wmf.ci.cloudbees.com/view/wl/), [Code Climate](https://codeclimate.com/github/wikimedia/mediawiki-extensions-WikiLove)
13. ZeroRatedMobileAccess: [Gerrit](https://gerrit.wikimedia.org/r/#/admin/projects/mediawiki/extensions/ZeroRatedMobileAccess), [GitHub](https://github.com/wikimedia/mediawiki-extensions-ZeroRatedMobileAccess), [Jenkins](https://wmf.ci.cloudbees.com/view/zero/), [Code Climate](https://codeclimate.com/github/wikimedia/mediawiki-extensions-ZeroRatedMobileAccess)
14. browsertests: [Gerrit](https://gerrit.wikimedia.org/r/#/admin/projects/qa/browsertests), [GitHub](https://github.com/wikimedia/qa-browsertests), [Jenkins](https://wmf.ci.cloudbees.com/view/bt/), [Code Climate](https://codeclimate.com/github/wikimedia/qa-browsertests)

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Also see https://www.mediawiki.org/wiki/QA/Browser_testing#How_to_contribute

## Release notes

### 0.2.20

* Updated readme file with release notes
* `APIPage#create` should use `title` and `content` variables when creating a page

### 0.2.19

* APIPage can create pages via API

### 0.2.18

* If environment variable HEADLESS is set to true, run a local browser

### 0.2.17

* File needed for file upload steps was not required
* Login sometimes takes >5s to complete
* Updated readme file

### 0.2.16

* MobileFrontend and UploadWizard should share upload steps

### 0.2.15

* Fixed setting a cookie when starting the browser

### 0.2.14

* A cookie can optionally be set when starting the browser

### 0.2.13

* The gem should be able to start local and remote browsers with optional browser setup

### 0.2.12

* Make "page has no ResourceLoader errors" Cucumber step available

### 0.2.11

* Add optional argument wait_for_logout_element to login_with method
* Wrapped README.md to 80 chars for readability

### 0.2.10

* Added "I am at a random page" step to the gem
* Make it possible to check for ResourceLoader errors anywhere

### 0.2.9

* Fixed login method, instead of waiting for link with text in English, wait for link with href

### 0.2.8

* Moved BROWSER_TIMEOUT implementation to the gem
* Moved Jenkins doc to jenkins-job-builder-config repo
* Updated Ruby version from 2.1.0 to 2.1.1
* Cloudbees Jenkins jobs are now created using Jenkins Job Builder

### 0.2.7

* Wait for login process to complete
* Added support for @custom-browser Cucumber tag
* Removed configuration of Sauce Labs browsers from the gem

### 0.2.2

* `SCREENSHOT_FAILURES_PATH` environment variable lets you override the destination path for screenshots
* Moved resetting preferences to the gem
* Moved Given(/^I am logged in$/) step to the gem
* Renamed remaining instances of mediawiki-selenium to mediawiki_selenium
* Moved LoginPage class and URL module to the gem
* Moved files to support folder

### 0.2.1

* Get screenshots on failures by setting the environment variable `SCREENSHOT_FAILURES` to `true`
* Add a Gemfile to force a good version of Ruby
* Fixed several "gem build" warnings
* Renamed mediawiki-selenium Ruby gem to mediawiki_selenium
* Added missing contributors

### 0.1.20

* Added the most recent versions of all runtime dependencies

### 0.1.19

* Fixed warning message displayed while building the gem
* Display error message if browser is not started for some reason

### 0.1.18

* Increases verbosity of Cucumber output
* Run browsers headlessly if HEADLESS environment variable is set to true
* Moved Sauce Labs browser configuration to the gem
* Removed debugging code from Jenkins jobs

### 0.1.16

* Resize PhantomJS to 1280x1024 when the browser opens
* Removed code that is no longer needed
* Send e-mail for every unstable Jenkins job
* All "bundle exec cucumber" should end in "|| echo "Failure in cucumber""
* Use new e-mail template
* Added build schedule option for Jenkins builds
* Deleted unused "branch" option
* Added --backtrace to cucumber
* Updated Ruby
* Replacing single quotes with double quotes
* Fix Accept-Language feature for PhantomJS

### 0.1.14

* Make it possible to run tests on Cloudbees using PhantomJS
* Merging the readme files of other repositories with this one
* Prefer double-quoted strings in Ruby code
* Added links to Jenkins jobs

### 0.1.13

* Resize browser at Sauce Labs to maximum supported size

### 0.1.12

* Introduce new variable that points to the variable that holds the password

### 0.1.11

* Passwords are in environment variables but not displayed in Jenkins console log
* Set up Code Climate for all repositories that have Ruby code
* Deleted Jenkins jobs that are known to fail
* Updated documentation

### 0.1.10

* Updated Jenkins documentation
* Moving gems that all repositories need to the gem
* Deleted unused files
* The gem homepage now points to Gerrit repository
* Moved documentation from qa/browsertests repository
* Updated readme file with usage instructions and links to repositories that use the gem
* Add .gitreview

### 0.1.8

* Use rest_client instead of curl when using Sauce Labs API
* Set build number when running tests at Sauce Labs

### 0.1.7

* MobileFrontend repository uses @user_agent tag

### 0.1.6

* Added code needed for CirrusSearch repository

### 0.1.5

* Move UniversalLanguageSelector hooks back to it's repository

### 0.1.4

* Remove debugging code committed by mistake

### 0.1.3

* Moved Cucumber hooks used only for UniversalLanguageSelector to a separate file

### 0.1.2

* Forgot to require hooks file

### 0.1.1

* Moved Cucumber hooks to hooks.rb file

### 0.1.0

* The gem is working, I think it is time to move from 0.0.x

### 0.0.7

* Moved code from UniversalLanguageSelector repository

### 0.0.6

* Updated env.rb file to the latest version
* Added license headers to all files that did not have it

### 0.0.5

* Imported sauce.rb file from browsertests repository

### 0.0.4

* Include env.rb file from browsertests repository

### 0.0.3

* Changed license to GPL-2

### 0.0.2

* Fixed a couple of "gem build" warnings

### 0.0.1

* Added description and summary to gemspec file
* Auto generated gem by RubyMine
