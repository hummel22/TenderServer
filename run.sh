#!/usr/local/bin/bash
set -e

if [ $# -eq 0 ]; then
  NO_OPS="set"
fi

while [[ $# -gt 0 ]]
do
key="$1"
echo $key

case $key in
    -m|--migrate)
    MIGRATE="set"
    ;;
    -fr|--frontend)
    FRONT="set"
    ;;
    -f|--migrate-force)
    MIGRATE_REAL="set"
    ;;
    -c|--compile)
    COMPILE="set"
    ;;
    -r|--run)
    RUN="set"
    ;;
    -s|--shutdown)
    SHUTDOWN="set"
    ;;
    -a|--all)
    COMPILE="set"
    RUN="set"
    ;;
    *)
    NO_OPS="set"
    echo "$key is not a valid options"

    ;;
esac
shift
done




CURRENT=`pwd`
ASSETS="src/main/resources/assets"

if [[ -v NO_OPS ]]; then
    echo "Options"
    echo " -m, --migrate    -- Run a dry migration"
    echo " -fr, --frontend  -- Run tiny server for front end dev"
    echo " -c, --compile    -- Compile front/backend"
    echo " -r, --run        -- Run backend server"
    echo " -s, --shutdown   -- Shutdown TBD"
    echo " -a, --all        -- Compile and run server"    # unknown option
fi

if [[ -v MIGRATE ]]; then
    echo "Migrate Dry Run"
     java -jar ./target/com.olledeux-0.0.1.jar db migrate config.yml --dry-run
fi

if [[ -v FRONT ]]; then 
    echo "Front"; 
    cd $ASSETS
    webpack-dev-server --port 9091
fi

if [[ -v MIGRATE_REAL ]]; then 
    echo "Do a real migration!!"; 
    read -n 1 -s -r -p "Press any key to continue"
    read -r -p "Are you sure? [y/N] " response
    response=${response,,}    # tolower
    if [[ "$response" =~ ^(yes|y)$ ]]
    then
      echo "DIDIT"
      #java -jar ./target/com.olledeux-0.0.1.jar db migrate config.yml
    fi
fi

if [[ -v COMPILE ]];then 
    echo "Compile";
    cd $ASSETS 
    npm install
    webpack --progress --colors
    cd $CURRENT
    mvn clean install
fi

if [[ -v RUN ]];then 
    java -jar ./target/com.olledeux-0.0.1.jar server config.yml
    echo "Run"; 
fi

if [[ -v SHUTDOWN ]];then 
    echo "Shutdown"; 
fi


exit 0

CURRENT=`pwd`
cd src/main/resources/assets/
npm install
webpack --progress --colors

cd $CURRENT
mvn clean install && java -jar ./target/com.olledeux-0.0.1.jar server config.yml
