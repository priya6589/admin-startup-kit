/**
 * AdminLTE Demo Menu
 * ------------------
 * You should not use this file in production.
 * This file is for demo purposes only.
 */

/* eslint-disable camelcase */

(function ($) {
  'use strict'

  setTimeout(function () {
    if (window.___browserSync___ === undefined && Number(localStorage.getItem('AdminLTE:Demo:MessageShowed')) < Date.now()) {
      localStorage.setItem('AdminLTE:Demo:MessageShowed', (Date.now()) + (15 * 60 * 1000))
      // eslint-disable-next-line no-alert
      // alert('You load AdminLTE\'s "demo.js", \nthis file is only created for testing purposes!')
    }
  }, 1000)

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }


  function createSkinBlock(colors, callback, noneSelected) {
    var $block = $('<select />', {
      class: noneSelected ? 'custom-select mb-3 border-0' : 'custom-select mb-3 text-light border-0 ' + colors[0].replace(/accent-|navbar-/, 'bg-')
    })

    if (noneSelected) {
      var $default = $('<option />', {
        text: 'None Selected'
      })

      $block.append($default)
    }

    colors.forEach(function (color) {
      var $color = $('<option />', {
        class: (typeof color === 'object' ? color.join(' ') : color).replace('navbar-', 'bg-').replace('accent-', 'bg-'),
        text: capitalizeFirstLetter((typeof color === 'object' ? color.join(' ') : color).replace(/navbar-|accent-|bg-/, '').replace('-', ' '))
      })

      $block.append($color)
    })
    if (callback) {
      $block.on('change', callback)
    }

    return $block
  }

  var $sidebar = $('.control-sidebar')
  var $container = $('<div />', {
    class: 'p-3 control-sidebar-content'
  })

  $sidebar.append($container)

  // Checkboxes

  $container.append(
    '<h6 class="text-center">Customize Your App</h6><hr class="mb-2"/>'
  )
  function getThemePreference(key) {
    return localStorage.getItem(key) || 'unchecked';
  }

  function applyTheme(place, key, mode) {
    if (getThemePreference(key) === 'checked') {
      $(place).addClass(key);
      mode.prop('checked', true);
    } else {
      $(place).removeClass(key);
      mode.prop('checked', false);
    }
  }
  var $dark_mode_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('body').hasClass('dark-mode'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      localStorage.setItem('dark-mode', 'checked');
      $('body').addClass('dark-mode')
    } else {
      localStorage.setItem('dark-mode', 'unchecked');
      $('body').removeClass('dark-mode')
    }
  })
  var $dark_mode_container = $('<div />', { class: 'mb-4' }).append($dark_mode_checkbox).append('<span>Dark Mode</span>')
  applyTheme('body', 'dark-mode', $dark_mode_checkbox);
  $container.append($dark_mode_container)

  // navbar
  $container.append('<h6>Navbar Options</h6>')
  var $header_fixed_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('body').hasClass('layout-navbar-fixed'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      localStorage.setItem('layout-navbar-fixed', 'checked');
      $('body').addClass('layout-navbar-fixed')
    } else {
      localStorage.setItem('layout-navbar-fixed', 'unchecked');
      $('body').removeClass('layout-navbar-fixed')
    }
  })
  var $header_fixed_container = $('<div />', { class: 'mb-1' }).append($header_fixed_checkbox).append('<span>Fixed</span>')
  applyTheme('body', 'layout-navbar-fixed', $header_fixed_checkbox);
  $container.append($header_fixed_container)


  // dropdown-legacy
  var $dropdown_legacy_offset_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.main-header').hasClass('dropdown-legacy'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      localStorage.setItem('dropdown-legacy', 'checked');
      $('.main-header').addClass('dropdown-legacy')
    } else {
      localStorage.setItem('dropdown-legacy', 'unchecked');
      $('.main-header').removeClass('dropdown-legacy')
    }
  })
  var $dropdown_legacy_offset_container = $('<div />', { class: 'mb-1' }).append($dropdown_legacy_offset_checkbox).append('<span>Dropdown Legacy Offset</span>')
  applyTheme('.main-header', 'dropdown-legacy', $dropdown_legacy_offset_checkbox);
  $container.append($dropdown_legacy_offset_container)

  // border
  var $no_border_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.main-header').hasClass('border-bottom-0'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      localStorage.setItem('border-bottom-0', 'checked');
      $('.main-header').addClass('border-bottom-0')
    } else {
      localStorage.setItem('border-bottom-0', 'unchecked');
      $('.main-header').removeClass('border-bottom-0')
    }
  })
  var $no_border_container = $('<div />', { class: 'mb-4' }).append($no_border_checkbox).append('<span>No border</span>')

  $container.append($no_border_container)
  applyTheme('.main-header', 'border-bottom-0', $no_border_checkbox);
  $container.append('<h6>Sidebar Options</h6>')

  // sidebar
  var $sidebar_collapsed_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('body').hasClass('sidebar-collapse'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      localStorage.setItem('sidebar-collapse', 'checked');
      $('body').addClass('sidebar-collapse')
      $(window).trigger('resize')
    } else {
      localStorage.setItem('sidebar-collapse', 'unchecked');
      $('body').removeClass('sidebar-collapse')
      $(window).trigger('resize')
    }
  })
  var $sidebar_collapsed_container = $('<div />', { class: 'mb-1' }).append($sidebar_collapsed_checkbox).append('<span>Collapsed</span>')
  applyTheme('body', 'sidebar-collapse', $sidebar_collapsed_checkbox);
  $container.append($sidebar_collapsed_container)

  $(document).on('collapsed.lte.pushmenu', '[data-widget="pushmenu"]', function () {
    $sidebar_collapsed_checkbox.prop('checked', true)
  })
  $(document).on('shown.lte.pushmenu', '[data-widget="pushmenu"]', function () {
    $sidebar_collapsed_checkbox.prop('checked', false)
  })

  var $sidebar_fixed_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('body').hasClass('layout-fixed'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      localStorage.setItem('layout-fixed', 'checked');
      $('body').addClass('layout-fixed')
      $(window).trigger('resize')
    } else {
      localStorage.setItem('layout-fixed', 'unchecked');
      $('body').removeClass('layout-fixed')
      $(window).trigger('resize')
    }
  })
  var $sidebar_fixed_container = $('<div />', { class: 'mb-1' }).append($sidebar_fixed_checkbox).append('<span>Fixed</span>')
  applyTheme('body', 'layout-fixed', $sidebar_fixed_checkbox);// applyTheme for store that changes...
  $container.append($sidebar_fixed_container)

  var $sidebar_mini_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('body').hasClass('sidebar-mini'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      localStorage.setItem('sidebar-mini', 'checked');// store that changes in localStorage...
      $('body').addClass('sidebar-mini');
    } else {
      localStorage.setItem('sidebar-mini', 'unchecked');//store that changes in localStorage...
      $('body').removeClass('sidebar-mini')
    }
  })
  var $sidebar_mini_container = $('<div />', { class: 'mb-1' }).append($sidebar_mini_checkbox).append('<span>Sidebar Mini</span>')
  applyTheme('body', 'sidebar-mini', $sidebar_mini_checkbox); // applyTheme for store that changes...
  $container.append($sidebar_mini_container)

  var $sidebar_mini_md_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('body').hasClass('sidebar-mini-md'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      localStorage.setItem('sidebar-mini-md', 'checked');// store that changes in localStorage...
      $('body').addClass('sidebar-mini-md')
    } else {
      localStorage.setItem('sidebar-mini-md', 'unchecked');// store that changes in localStorage...
      $('body').removeClass('sidebar-mini-md')
    }
  })
  var $sidebar_mini_md_container = $('<div />', { class: 'mb-1' }).append($sidebar_mini_md_checkbox).append('<span>Sidebar Mini MD</span>')
  applyTheme('body', 'sidebar-mini-md', $sidebar_mini_md_checkbox); // applyTheme for store that changes...
  $container.append($sidebar_mini_md_container)

  var $sidebar_mini_xs_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('body').hasClass('sidebar-mini-xs'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      localStorage.setItem('sidebar-mini-xs', 'checked');// store that changes in localStorage...
      $('body').addClass('sidebar-mini-xs')
    } else {
      localStorage.setItem('sidebar-mini-xs', 'unchecked');// store that changes in localStorage...
      $('body').removeClass('sidebar-mini-xs')
    }
  })
  var $sidebar_mini_xs_container = $('<div />', { class: 'mb-1' }).append($sidebar_mini_xs_checkbox).append('<span>Sidebar Mini XS</span>')
  applyTheme('body', 'sidebar-mini-xs', $sidebar_mini_xs_checkbox); // applyTheme for store that changes...
  $container.append($sidebar_mini_xs_container)

  var $flat_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.nav-sidebar').hasClass('nav-flat'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      localStorage.setItem('nav-flat', 'checked');// store that changes in localStorage...
      $('.nav-sidebar').addClass('nav-flat')
    } else {
      localStorage.setItem('nav-flat', 'unchecked');// store that changes in localStorage...
      $('.nav-sidebar').removeClass('nav-flat')
    }
  })
  var $flat_sidebar_container = $('<div />', { class: 'mb-1' }).append($flat_sidebar_checkbox).append('<span>Nav Flat Style</span>')
  applyTheme('.nav-sidebar', 'nav-flat', $flat_sidebar_checkbox); // applyTheme for store that changes...
  $container.append($flat_sidebar_container)

  var $legacy_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.nav-sidebar').hasClass('nav-legacy'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      localStorage.setItem('nav-legacy', 'checked');// store that changes in localStorage...
      $('.nav-sidebar').addClass('nav-legacy')
    } else {
      localStorage.setItem('nav-legacy', 'unchecked');// store that changes in localStorage...
      $('.nav-sidebar').removeClass('nav-legacy')
    }
  })
  var $legacy_sidebar_container = $('<div />', { class: 'mb-1' }).append($legacy_sidebar_checkbox).append('<span>Nav Legacy Style</span>')
  applyTheme('.nav-sidebar', 'nav-legacy', $legacy_sidebar_checkbox); // applyTheme for store that changes...
  $container.append($legacy_sidebar_container)

  var $compact_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.nav-sidebar').hasClass('nav-compact'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      localStorage.setItem('nav-compact', 'checked');// store that changes in localStorage...
      $('.nav-sidebar').addClass('nav-compact')
    } else {
      localStorage.setItem('nav-compact', 'unchecked');// store that changes in localStorage...
      $('.nav-sidebar').removeClass('nav-compact')
    }
  })
  var $compact_sidebar_container = $('<div />', { class: 'mb-1' }).append($compact_sidebar_checkbox).append('<span>Nav Compact</span>')
  applyTheme('.nav-sidebar', 'nav-compact', $compact_sidebar_checkbox); // applyTheme for store that changes...
  $container.append($compact_sidebar_container)

  var $child_indent_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.nav-sidebar').hasClass('nav-child-indent'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      localStorage.setItem('nav-child-indent', 'checked');// store that changes in localStorage...
      $('.nav-sidebar').addClass('nav-child-indent')
    } else {
      localStorage.setItem('nav-child-indent', 'unchecked');// store that changes in localStorage...
      $('.nav-sidebar').removeClass('nav-child-indent')
    }
  })
  var $child_indent_sidebar_container = $('<div />', { class: 'mb-1' }).append($child_indent_sidebar_checkbox).append('<span>Nav Child Indent</span>')
  applyTheme('.nav-sidebar', 'nav-child-indent', $child_indent_sidebar_checkbox); // applyTheme for store that changes...
  $container.append($child_indent_sidebar_container)

  var $child_hide_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.nav-sidebar').hasClass('nav-collapse-hide-child'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      localStorage.setItem('nav-collapse-hide-child', 'checked');// store that changes in localStorage...
      $('.nav-sidebar').addClass('nav-collapse-hide-child')
    } else {
      localStorage.setItem('nav-collapse-hide-child', 'unchecked');// store that changes in localStorage...
      $('.nav-sidebar').removeClass('nav-collapse-hide-child')
    }
  })
  var $child_hide_sidebar_container = $('<div />', { class: 'mb-1' }).append($child_hide_sidebar_checkbox).append('<span>Nav Child Hide on Collapse</span>')
  applyTheme('.nav-sidebar', 'nav-collapse-hide-child', $child_hide_sidebar_checkbox); // applyTheme for store that changes...
  $container.append($child_hide_sidebar_container)

  var $no_expand_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.main-sidebar').hasClass('sidebar-no-expand'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      localStorage.setItem('sidebar-no-expand', 'checked');// store that changes in localStorage...
      $('.main-sidebar').addClass('sidebar-no-expand')
    } else {
      localStorage.setItem('sidebar-no-expand', 'unchecked');// store that changes in localStorage...
      $('.main-sidebar').removeClass('sidebar-no-expand')
    }
  })
  var $no_expand_sidebar_container = $('<div />', { class: 'mb-4' }).append($no_expand_sidebar_checkbox).append('<span>Disable Hover/Focus Auto-Expand</span>')
  applyTheme('.main-sidebar', 'sidebar-no-expand', $no_expand_sidebar_checkbox); // applyTheme for store that changes...
  $container.append($no_expand_sidebar_container)

  $container.append('<h6>Footer Options</h6>')
  var $footer_fixed_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.main-footer').hasClass('fixed-bottom'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      localStorage.setItem('fixed-bottom', 'checked');// store that changes in localStorage...
      $('.main-footer').addClass('fixed-bottom')
    } else {
      localStorage.setItem('fixed-bottom', 'unchecked');// store that changes in localStorage...
      $('.main-footer').removeClass('fixed-bottom')
    }
  })
  var $footer_fixed_container = $('<div />', { class: 'mb-4' }).append($footer_fixed_checkbox).append('<span>Fixed</span>')
  applyTheme('.main-footer', 'fixed-bottom', $footer_fixed_checkbox); // applyTheme for store that changes...
  $container.append($footer_fixed_container)

  $container.append('<h6>Small Text Options</h6>')

  var $text_sm_body_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('body').hasClass('text-sm'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      localStorage.setItem('text-sm', 'checked');// store that changes in localStorage...
      $('body').addClass('text-sm')
    } else {
      localStorage.setItem('text-sm', 'unchecked');// store that changes in localStorage...
      $('body').removeClass('text-sm')
    }
  })
  var $text_sm_body_container = $('<div />', { class: 'mb-1' }).append($text_sm_body_checkbox).append('<span>Body</span>')
  applyTheme('body', 'text-sm', $text_sm_body_checkbox); // applyTheme for store that changes...
  $container.append($text_sm_body_container)

  var $text_sm_header_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.main-header').hasClass('text-sm'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      localStorage.setItem('nav text-sm', 'checked');// store that changes in localStorage...
      $('.main-header').addClass('nav text-sm')
    } else {
      localStorage.setItem('nav text-sm', 'unchecked');// store that changes in localStorage...
      $('.main-header').removeClass('nav text-sm')
    }
  })
  var $text_sm_header_container = $('<div />', { class: 'mb-1' }).append($text_sm_header_checkbox).append('<span>Navbar</span>')
  applyTheme('.main-header', 'nav text-sm', $text_sm_header_checkbox); // applyTheme for store that changes...
  $container.append($text_sm_header_container)

  var $text_white_header_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.main-header .nav-link').hasClass('text-white'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      localStorage.setItem('nav text-white', 'checked');// store that changes in localStorage...
      $('.main-header .nav-link').addClass('nav text-white')
    } else {
      localStorage.setItem('nav text-white', 'unchecked');// store that changes in localStorage...
      $('.main-header .nav-link').removeClass('nav text-white')
    }
  })
  var $text_white_header_container = $('<div />', { class: 'mb-1' }).append($text_white_header_checkbox).append('<span>Navbar Text white</span>')
  applyTheme('.nav-link', 'nav text-white', $text_white_header_checkbox); // applyTheme for store that changes...
  $container.append($text_white_header_container)

  var $text_sm_brand_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.brand-link').hasClass('text-sm'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      localStorage.setItem('brand text-sm', 'checked');// store that changes in localStorage...
      $('.brand-link').addClass('text-sm')
    } else {
      localStorage.setItem('brand text-sm', 'unchecked');// store that changes in localStorage...
      $('.brand-link').removeClass('text-sm')
    }
  })
  var $text_sm_brand_container = $('<div />', { class: 'mb-1' }).append($text_sm_brand_checkbox).append('<span>Brand</span>')
  applyTheme('.brand-link', 'brand text-sm', $text_sm_brand_checkbox); // applyTheme for store that changes...
  $container.append($text_sm_brand_container)

  var $text_sm_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.nav-sidebar').hasClass('text-sm'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      localStorage.setItem('sidebar text-sm', 'checked');// store that changes in localStorage...
      $('.nav-sidebar').addClass('text-sm')
    } else {
      localStorage.setItem('sidebar text-sm', 'unchecked');// store that changes in localStorage...
      $('.nav-sidebar').removeClass('text-sm')
    }
  })
  var $text_sm_sidebar_container = $('<div />', { class: 'mb-1' }).append($text_sm_sidebar_checkbox).append('<span>Sidebar Nav</span>')
  applyTheme('.nav-sidebar', 'sidebar text-sm', $text_sm_sidebar_checkbox); // applyTheme for store that changes...
  $container.append($text_sm_sidebar_container)

  var $text_sm_footer_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.main-footer').hasClass('text-sm'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      localStorage.setItem('footer text-sm', 'checked');// store that changes in localStorage...
      $('.main-footer').addClass('text-sm')
    } else {
      localStorage.setItem('footer text-sm', 'unchecked');// store that changes in localStorage...
      $('.main-footer').removeClass('text-sm')
    }
  })
  var $text_sm_footer_container = $('<div />', { class: 'mb-4' }).append($text_sm_footer_checkbox).append('<span>Footer</span>')
  applyTheme('.main-footer', 'footer text-sm', $text_sm_footer_checkbox); // applyTheme for store that changes...
  $container.append($text_sm_footer_container)



  // Color Arrays

  var navbar_dark_skins = [
    'navbar-primary',
    'navbar-secondary',
    'navbar-info',
    'navbar-success',
    'navbar-danger',
    'navbar-indigo',
    'navbar-purple',
    'navbar-pink',
    'navbar-navy',
    'navbar-lightblue',
    'navbar-teal',
    'navbar-cyan',
    'navbar-dark',
    'navbar-gray-dark',
    'navbar-gray'
  ]

  var navbar_light_skins = [
    'navbar-light',
    'navbar-warning',
    'navbar-white',
    'navbar-orange'
  ]

  var sidebar_colors = [
    'bg-primary',
    'bg-warning',
    'bg-info',
    'bg-danger',
    'bg-success',
    'bg-indigo',
    'bg-lightblue',
    'bg-navy',
    'bg-purple',
    'bg-fuchsia',
    'bg-pink',
    'bg-maroon',
    'bg-orange',
    'bg-lime',
    'bg-teal',
    'bg-olive'
  ]

  var accent_colors = [
    'accent-primary',
    'accent-warning',
    'accent-info',
    'accent-danger',
    'accent-success',
    'accent-indigo',
    'accent-lightblue',
    'accent-navy',
    'accent-purple',
    'accent-fuchsia',
    'accent-pink',
    'accent-maroon',
    'accent-orange',
    'accent-lime',
    'accent-teal',
    'accent-olive'
  ]

  var sidebar_skins = [
    'sidebar-dark-primary',
    'sidebar-dark-warning',
    'sidebar-dark-info',
    'sidebar-dark-danger',
    'sidebar-dark-success',
    'sidebar-dark-indigo',
    'sidebar-dark-lightblue',
    'sidebar-dark-navy',
    'sidebar-dark-purple',
    'sidebar-dark-fuchsia',
    'sidebar-dark-pink',
    'sidebar-dark-maroon',
    'sidebar-dark-orange',
    'sidebar-dark-lime',
    'sidebar-dark-teal',
    'sidebar-dark-olive',
    'sidebar-light-primary',
    'sidebar-light-warning',
    'sidebar-light-info',
    'sidebar-light-danger',
    'sidebar-light-success',
    'sidebar-light-indigo',
    'sidebar-light-lightblue',
    'sidebar-light-navy',
    'sidebar-light-purple',
    'sidebar-light-fuchsia',
    'sidebar-light-pink',
    'sidebar-light-maroon',
    'sidebar-light-orange',
    'sidebar-light-lime',
    'sidebar-light-teal',
    'sidebar-light-olive'
  ]

  // Navbar Variants
  $container.append('<h6>Navbar Variants</h6>');

var $navbar_variants = $('<div />', {
  class: 'd-flex'
});

var navbar_all_colors = navbar_dark_skins.concat(navbar_light_skins);
var $navbar_variants_colors = createSkinBlock(navbar_all_colors, function () {
  var color = $(this).find('option:selected').attr('class');
  var $main_header = $('.main-header');
  $main_header.removeClass('navbar-dark navbar-light');
  navbar_all_colors.forEach(function (color) {
    $main_header.removeClass(color);
  });

  $(this).removeClass().addClass('custom-select mb-3 text-light border-0');

  if (navbar_dark_skins.indexOf(color) > -1) {
    $main_header.addClass('navbar-dark');
    $(this).addClass(color + ' text-light');
  } else {
    $main_header.addClass('navbar-light');
    $(this).addClass(color);
  }

  $main_header.addClass(color);
  // Save the selected color to localStorage
  localStorage.setItem('navbarColor', color);

  // Check if the navbar color is white and remove text-white class from nav-link elements
  if (color === 'navbar-white') {
    $('.nav-link').removeClass('text-white');
  } else {
    $('.nav-link').addClass('text-white');
  }
});

// for getting the stored navcolor from localStorage...
var storedNavbarColor = localStorage.getItem('navbarColor');
if (storedNavbarColor) {
  var $main_header = $('.main-header');
  $main_header.addClass(storedNavbarColor);
  if (navbar_dark_skins.indexOf(storedNavbarColor) > -1) {
    $main_header.addClass('navbar-dark');
  } else {
    $main_header.addClass('navbar-light');
  }
  $navbar_variants_colors.find('option.' + storedNavbarColor).prop('selected', true);
  $navbar_variants_colors.removeClass().addClass('custom-select mb-3 text-light border-0 ').addClass(storedNavbarColor);

  console.log(storedNavbarColor);
  // If the navbar color is white, remove text-white class from nav-link elements
  if (storedNavbarColor == 'bg-white' || storedNavbarColor == 'bg-light') {
    $('.main-header .nav-link').removeClass('text-white');
    $('main-header .nav-link').addClass('text-black-50');
  }
}

$navbar_variants.append($navbar_variants_colors);
$container.append($navbar_variants);



  // Accent Colors
  $container.append('<h6>Accent Color Variants</h6>')
  var $accent_variants = $('<div />', {
    class: 'd-flex'
  })
  $container.append($accent_variants)
  $container.append(createSkinBlock(accent_colors, function () {
    var color = $(this).find('option:selected').attr('class')
    var $body = $('body')
    accent_colors.forEach(function (skin) {
      $body.removeClass(skin)
    })

    var accent_color_class = color.replace('bg-', 'accent-')
    // Save the selected accent color to localStorage
    localStorage.setItem('accentColor', accent_color_class)
    $body.addClass(accent_color_class)
  }, true)
  )

  // Check for the stored accent color in localStorage and apply it
  var storedAccentColor = localStorage.getItem('accentColor')
  if (storedAccentColor) {
    var $body = $('body')
    $body.addClass(storedAccentColor)
    
  $accent_variants.find('option.' + storedAccentColor).prop('selected', true)
  // $accent_variants.removeClass().addClass('custom-select mb-3 text-light border-0 ').addClass(storedAccentColor)
  }

  $accent_variants.append($accent_variants)
  $container.append($accent_variants)

  // Dark Sidebar Variants
$container.append('<h6>Dark Sidebar Variants</h6>');
var $sidebar_variants_dark = $('<div />', {
  class: 'd-flex'
});
$container.append($sidebar_variants_dark);
var $sidebar_dark_variants = createSkinBlock(sidebar_colors, function () {
  var color = $(this).find('option:selected').attr('class');
  var sidebar_class = 'sidebar-dark-' + color.replace('bg-', '');
  var $sidebar = $('.main-sidebar');
  
  // Remove all existing sidebar classes
  sidebar_colors.forEach(function (color) {
    $sidebar.removeClass('sidebar-light-' + color.replace('bg-', ''));
  });

  $(this).removeClass().addClass('custom-select mb-3 text-light border-0').addClass(color);

  // Save the selected sidebar color to localStorage
  localStorage.setItem('sidebarColor', sidebar_class);

  // Add the selected sidebar class
  $sidebar.removeClass('sidebar-light').addClass(sidebar_class);
  $('.sidebar').removeClass('os-theme-light').addClass('os-theme-dark');
}, true);
$container.append($sidebar_dark_variants);

// Apply stored sidebar color from localStorage
var storedSidebarColor = localStorage.getItem('sidebarColor');
if (storedSidebarColor) {
  var $sidebar = $('.main-sidebar');
  $sidebar.addClass(storedSidebarColor);
  var active_color = storedSidebarColor.replace('sidebar-dark-', 'bg-');
  $sidebar_dark_variants.find('option.' + active_color).prop('selected', true);
  $sidebar_dark_variants.removeClass().addClass('custom-select mb-3 text-light border-0 ').addClass(active_color);
}

// Light Sidebar Variants
$container.append('<h6>Light Sidebar Variants</h6>');
var $sidebar_variants_light = $('<div />', {
  class: 'd-flex'
});
$container.append($sidebar_variants_light);
var $sidebar_light_variants = createSkinBlock(sidebar_colors, function () {
  var color = $(this).find('option:selected').attr('class');
  var sidebar_class = 'sidebar-light-' + color.replace('bg-', '');
  var $sidebar = $('.main-sidebar');
  
  // Remove all existing sidebar classes
  sidebar_colors.forEach(function (color) {
    $sidebar.removeClass('sidebar-dark-' + color.replace('bg-', ''));
  });

  $(this).removeClass().addClass('custom-select mb-3 text-light border-0').addClass(color);

  // Save the selected sidebar color to localStorage
  localStorage.setItem('sidebarColor', sidebar_class);

  // Add the selected sidebar class
  $sidebar.removeClass('sidebar-dark').addClass(sidebar_class);
  $('.sidebar').removeClass('os-theme-dark').addClass('os-theme-light');
  
  // Add white background color
  $('.main-sidebar').css('background-color', '#fff');
}, true);
$container.append($sidebar_light_variants);

// Apply stored sidebar color from localStorage
var storedSidebarColor = localStorage.getItem('sidebarColor');
if (storedSidebarColor) {
  var $sidebar = $('.main-sidebar');
  $sidebar.addClass(storedSidebarColor);
  var active_color = storedSidebarColor.replace('sidebar-light-', 'bg-');
  $sidebar_light_variants.find('option.' + active_color).prop('selected', true);
  $sidebar_light_variants.removeClass().addClass('custom-select mb-3 text-light border-0 ').addClass(active_color);
  
  // Add white background color if light sidebar variant is selected
  if (storedSidebarColor.startsWith('sidebar-light-')) {
    $($sidebar).css('background-color', '#fff');
    $('.main-sidebar .nav-link').removeClass("text-white");
    $('.main-sidebar .nav-link').addClass("text-black-50");
  }
}

// brand logo color
var logo_skins = navbar_all_colors;
$container.append('<h6>Brand Logo Variants</h6>');
var $logo_variants = $('<div />', {
  class: 'd-flex'
});
$container.append($logo_variants);

var $clear_btn = $('<a />', {
  href: '#'
}).text('clear').on('click', function (e) {
  e.preventDefault();
  var $logo = $('.brand-link');
  logo_skins.forEach(function (skin) {
    $logo.removeClass(skin);
  });
  localStorage.removeItem('brandLogoColor'); // Remove stored logo color from localStorage
});

var $brand_variants = createSkinBlock(logo_skins, function () {
  var color = $(this).find('option:selected').attr('class');
  var $logo = $('.brand-link');

  if (color === 'navbar-light' || color === 'navbar-white') {
    $logo.addClass('text-black');
  } else {
    $logo.removeClass('text-black');
  }

  logo_skins.forEach(function (skin) {
    $logo.removeClass(skin);
  });

  if (color) {
    $(this).removeClass().addClass('custom-select mb-3 border-0').addClass(color).addClass(color !== 'navbar-light' && color !== 'navbar-white' ? 'text-light' : '');
  } else {
    $(this).removeClass().addClass('custom-select mb-3 border-0');
  }

  $logo.addClass(color);
  localStorage.setItem('brandLogoColor', color); // Save the selected logo color to localStorage
}, true).append($clear_btn);
$container.append($brand_variants);

var storedBrandLogoColor = localStorage.getItem('brandLogoColor');
if (storedBrandLogoColor) {
  var $logo = $('.brand-link');
  $logo.addClass(storedBrandLogoColor);
  var active_brand_color = storedBrandLogoColor.replace('navbar-', 'bg-');
  $brand_variants.find('option.' + active_brand_color).prop('selected', true);
  $brand_variants.removeClass().addClass('custom-select mb-3 text-light border-0 ').addClass(active_brand_color);
}

})(jQuery)
