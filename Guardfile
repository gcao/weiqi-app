# More info at https://github.com/guard/guard#readme

guard 'bundler' do
  watch('Gemfile')
end

guard 'shell' do
  watch(%r{^client/stylesheets/.+\.sass$}) { `sass client/stylesheets/WeiqiBoard.sass client/stylesheets/WeiqiBoard.css` }
end

