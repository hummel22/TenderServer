set -e
CURRENT=`pwd`
cd src/main/resources/assets/
npm install
webpack --progress --colors

cd $CURRENT
mvn clean install && java -jar ./target/com.olledeux-0.0.1.jar server config.yml
