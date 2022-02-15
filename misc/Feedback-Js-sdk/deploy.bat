@echo off 
:: deploy dev - will deploy to dev.gigatester.io/dist/feedback-agent/browser
:: deploy beta - will deploy to beta.gigatester.io/dist/feedback-agent/browser
:: deploy abc - will deploy to abc.gigatester.io/dist/feedback-agent/browser
:: deploy - will deploy to dist.gigatester.io/feedback-agent/browser

if [%1]==[] goto :setDefault

set copyDir=s3://%1.gigatester.io/dist/feedback-agent/browser
goto :doSync

:setDefault
set copyDir=s3://dist.gigatester.io/feedback-agent/browser
goto :doSync

:doSync
echo deploying to %copyDir%
aws s3 sync src/ %copyDir%
