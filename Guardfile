# More info at https://github.com/guard/guard#readme

guard 'bundler' do
  watch('Gemfile')
end

guard 'shell' do
  watch(%r{^client/stylesheets/.+\.sass$}) do
    `sass client/stylesheets/WeiqiBoard.sass client/stylesheets/WeiqiBoard.css`
    # build/stylesheets/WeiqiBoard.css is only used to check for unused css selectors
    `cp client/stylesheets/WeiqiBoard.css build/stylesheets/`
  end
end

