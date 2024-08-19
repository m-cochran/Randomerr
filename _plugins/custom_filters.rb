# _plugins/custom_filters.rb

module Jekyll
  module CustomFilters
    def extract_thumbnail(content)
      match = content.match(/<img[^>]+src="([^">]+)"/)
      match ? match[1] : nil
    end
  end
end

Liquid::Template.register_filter(Jekyll::CustomFilters)
