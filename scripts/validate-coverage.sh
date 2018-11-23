COVERAGE_THRESHOLD=90

node_modules/.bin/nyc \
  --reporter html \
  --reporter text-summary \
  --reporter lcov \
  npm run specs

percentage=`printf "%.0f" $(node_modules/.bin/coverage-percentage ./coverage/lcov.info --lcov)`
echo "Test Coverage: $percentage%"

if [ "$percentage" -lt "$COVERAGE_THRESHOLD" ]; then
  echo "Code coverage is lesser than $COVERAGE_THRESHOLD%. Please add tests for your code changes."
  exit 1
fi
