#!/bin/bash

export $(grep -v '^#' .env | xargs)

if [ -z $S3_BACKUPS_BUCKET ]; then
    echo "missing S3_BACKUPS_BUCKET"
    exit
fi

if [ -z $CRAFT_ENVIRONMENT ]; then
    echo "missing CRAFT_ENVIRONMENT"
    exit
fi

if [ ! $CRAFT_ENVIRONMENT = "prod" ]; then
    echo "PROD only script"
    exit
fi

aws s3 cp .env s3://$S3_BACKUPS_BUCKET/.env

FILENAME=$(date +"%Y%m%d-%H%M")

php ./craft db/backup ./storage/backups/$FILENAME.sql.zip --zip --overwrite --interactive=0

aws s3 cp ./storage/backups/$FILENAME.sql.zip s3://$S3_BACKUPS_BUCKET/sql/$FILENAME.sql.zip

rm -f ./storage/backups/$FILENAME.sql.zip

aws s3 ls s3://$S3_BACKUPS_BUCKET/sql/ | grep -v ' PRE ' | grep -v ' 0 ' > cleanup.txt

# shellcheck disable=SC2162
while read line; do
    age=$(date -d "$(echo "$line" | awk '{print $1 " " $2}')" +%s)
    if [ "$age" -lt $(date -d "60 days ago" +%s) ]; then
        name=$(echo "$line" | rev | awk '{print $1}' | rev)
        echo "deleting: $name"
        aws s3 rm s3://$S3_BACKUPS_BUCKET/sql/$name
    fi
done < cleanup.txt

rm -f cleanup.txt

exit
