module CustomFilters
  require 'nokogiri'

  def extract_image_url(content)
    doc = Nokogiri::HTML::DocumentFragment.parse(content)
    img_tag = doc.at_css('img')
    img_tag ? img_tag['src'] : nil
  end
end

Liquid::Template.register_filter(CustomFilters)
