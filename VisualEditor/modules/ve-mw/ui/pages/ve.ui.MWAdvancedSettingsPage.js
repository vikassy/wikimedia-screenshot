/*!
 * VisualEditor user interface MWAdvancedSettingsPage class.
 *
 * @copyright 2011-2014 VisualEditor Team and others; see AUTHORS.txt
 * @license The MIT License (MIT); see LICENSE.txt
 */

/**
 * MediaWiki meta dialog advanced settings page.
 *
 * @class
 * @extends OO.ui.PageLayout
 *
 * @constructor
 * @param {string} name Unique symbolic name of page
 * @param {Object} [config] Configuration options
 */
ve.ui.MWAdvancedSettingsPage = function VeUiMWAdvancedSettingsPage( name, config ) {
	var advancedSettingsPage = this;

	// Parent constructor
	OO.ui.PageLayout.call( this, name, config );

	// Properties
	this.metaList = null;
	this.indexingOptionTouched = false;
	this.newSectionEditLinkOptionTouched = false;

	this.advancedSettingsFieldset = new OO.ui.FieldsetLayout( {
		'$': this.$,
		'label': ve.msg( 'visualeditor-dialog-meta-advancedsettings-label' ),
		'icon': 'advanced'
	} );

	// Initialization

	// Indexing items
	this.indexing = new OO.ui.FieldLayout(
		new OO.ui.ButtonSelectWidget( { '$': this.$ } )
			.addItems( [
				new OO.ui.ButtonOptionWidget(
					'mwIndexForce',
					{ 'label': ve.msg( 'visualeditor-dialog-meta-settings-index-force' ) }
				),
				new OO.ui.ButtonOptionWidget(
					'default',
					{ 'label': ve.msg( 'visualeditor-dialog-meta-settings-index-default' ) }
				),
				new OO.ui.ButtonOptionWidget(
					'mwIndexDisable',
					{ 'label': ve.msg( 'visualeditor-dialog-meta-settings-index-disable' ) }
				)
			] )
			.connect( this, { 'select': 'onIndexingOptionChange' } ),
		{
			'$': this.$,
			'align': 'top',
			'label': ve.msg( 'visualeditor-dialog-meta-settings-index-label' )
		}
	);

	// New edit section link items
	this.newEditSectionLink = new OO.ui.FieldLayout(
		new OO.ui.ButtonSelectWidget( { '$': this.$ } )
			.addItems( [
				new OO.ui.ButtonOptionWidget(
					'mwNewSectionEditForce',
					{ 'label': ve.msg( 'visualeditor-dialog-meta-settings-newsectioneditlink-force' ) }
				),
				new OO.ui.ButtonOptionWidget(
					'default',
					{ 'label': ve.msg( 'visualeditor-dialog-meta-settings-newsectioneditlink-default' ) }
				),
				new OO.ui.ButtonOptionWidget(
					'mwNewSectionEditDisable',
					{ 'label': ve.msg( 'visualeditor-dialog-meta-settings-newsectioneditlink-disable' ) }
				)
			] )
			.connect( this, { 'select': 'onNewSectionEditLinkOptionChange' } ),
		{
			'$': this.$,
			'align': 'top',
			'label': ve.msg( 'visualeditor-dialog-meta-settings-newsectioneditlink-label' )
		}
	);

	this.metaItemCheckboxes = [];
	/*global mw*/
	if ( mw.config.get( 'wgVariantArticlePath' ) ) {
		this.metaItemCheckboxes.push(
			{
				metaName: 'mwNoContentConvert',
				label: ve.msg( 'visualeditor-dialog-meta-settings-nocontentconvert-label' )
			},
			{
				metaName: 'mwNoTitleConvert',
				label: ve.msg( 'visualeditor-dialog-meta-settings-notitleconvert-label' )
			}
		);
	}

	this.advancedSettingsFieldset.addItems( [ this.indexing, this.newEditSectionLink ] );

	$.each( this.metaItemCheckboxes, function () {
		this.fieldLayout = new OO.ui.FieldLayout(
			new OO.ui.CheckboxInputWidget( { '$': this.$ } ),
			{
				'$': advancedSettingsPage.$,
				'align': 'inline',
				'label': this.label
			}
		);
		advancedSettingsPage.advancedSettingsFieldset.addItems( [ this.fieldLayout ] );
	} );

	this.$element.append( this.advancedSettingsFieldset.$element );
};

/* Inheritance */

OO.inheritClass( ve.ui.MWAdvancedSettingsPage, OO.ui.PageLayout );

/* Methods */

/**
 * @inheritdoc
 */
ve.ui.MWAdvancedSettingsPage.prototype.setOutlineItem = function ( outlineItem ) {
	// Parent method
	OO.ui.PageLayout.prototype.setOutlineItem.call( this, outlineItem );

	if ( this.outlineItem ) {
		this.outlineItem
			.setIcon( 'advanced' )
			.setLabel( ve.msg( 'visualeditor-dialog-meta-advancedsettings-section' ) );
	}
};

/* Indexing option methods */

/**
 * Handle indexing option state change events.
 */
ve.ui.MWAdvancedSettingsPage.prototype.onIndexingOptionChange = function () {
	this.indexingOptionTouched = true;
};

/**
 * Get the first meta item of a given name
 *
 * @param {string} name Name of the meta item
 * @returns {Object|null} Meta item, if any
 */
ve.ui.MWAdvancedSettingsPage.prototype.getMetaItem = function ( name ) {
	return this.metaList.getItemsInGroup( name )[0] || null;
};

/* New edit section link option methods */

/**
 * Handle new edit section link change events.
 */
ve.ui.MWAdvancedSettingsPage.prototype.onNewSectionEditLinkOptionChange = function () {
	this.newSectionEditLinkOptionTouched = true;
};

/**
 * Setup settings page.
 *
 * @param {ve.dm.MetaList} metaList Meta list
 * @param {Object} [data] Dialog setup data
 */
ve.ui.MWAdvancedSettingsPage.prototype.setup = function ( metaList ) {
	this.metaList = metaList;

	var // Indexing items
		indexingField = this.indexing.getField(),
		indexingOption = this.getMetaItem( 'mwIndex' ),
		indexingType = indexingOption && indexingOption.element.type || 'default',

		// New section edit link items
		newSectionEditField = this.newEditSectionLink.getField(),
		newSectionEditLinkOption = this.getMetaItem( 'mwNewSectionEdit' ),
		newSectionEditLinkType = newSectionEditLinkOption && newSectionEditLinkOption.element.type || 'default',

		advancedSettingsPage = this;

	// Indexing items
	indexingField.selectItem( indexingField.getItemFromData( indexingType ) );
	this.indexingOptionTouched = false;

	// New section edit link items
	newSectionEditField.selectItem( newSectionEditField.getItemFromData( newSectionEditLinkType ) );
	this.newSectionEditLinkOptionTouched = false;

	// Simple checkbox items
	$.each( this.metaItemCheckboxes, function () {
		var currentValue = !!advancedSettingsPage.getMetaItem( this.metaName );
		this.fieldLayout.getField().setValue( currentValue );
	} );
};

/**
 * Tear down settings page.
 *
 * @param {Object} [data] Dialog tear down data
 */
ve.ui.MWAdvancedSettingsPage.prototype.teardown = function ( data ) {
	// Data initialization
	data = data || {};

	var // Indexing items
		currentIndexingItem = this.getMetaItem( 'mwIndex' ),
		newIndexingData = this.indexing.getField().getSelectedItem(),

		// New section edit link items
		currentNewSectionEditLinkItem = this.getMetaItem( 'mwNewSectionEdit' ),
		newNewSectionEditLinkOptionData = this.newEditSectionLink.getField().getSelectedItem(),

		advancedSettingsPage = this;

	// Alter the indexing option flag iff it's been touched & is actually different
	if ( this.indexingOptionTouched ) {
		if ( newIndexingData.data === 'default' ) {
			if ( currentIndexingItem ) {
				currentIndexingItem.remove();
			}
		} else {
			if ( !currentIndexingItem ) {
				this.metaList.insertMeta( { 'type': newIndexingData.data } );
			} else if ( currentIndexingItem.element.type !== newIndexingData.data ) {
				currentIndexingItem.replaceWith(
					ve.extendObject( true, {},
						currentIndexingItem.getElement(),
						{ 'type': newIndexingData.data }
					)
				);
			}
		}
	}

	// Alter the new section edit option flag iff it's been touched & is actually different
	if ( this.newSectionEditLinkOptionTouched ) {
		if ( newNewSectionEditLinkOptionData.data === 'default' ) {
			if ( currentNewSectionEditLinkItem ) {
				currentNewSectionEditLinkItem.remove();
			}
		} else {
			if ( !currentNewSectionEditLinkItem ) {
				this.metaList.insertMeta( { 'type': newNewSectionEditLinkOptionData.data } );
			} else if ( currentNewSectionEditLinkItem.element.type !== newNewSectionEditLinkOptionData.data ) {
				currentNewSectionEditLinkItem.replaceWith(
					ve.extendObject( true, {},
						currentNewSectionEditLinkItem.getElement(),
						{ 'type': newNewSectionEditLinkOptionData.data }
					)
				);
			}
		}
	}

	$.each( this.metaItemCheckboxes, function () {
		var currentItem = advancedSettingsPage.getMetaItem( this.metaName ),
			newValue = this.fieldLayout.getField().getValue();

		if ( currentItem && !newValue ) {
			currentItem.remove();
		} else if ( !currentItem && newValue ) {
			advancedSettingsPage.metaList.insertMeta( { 'type': this.metaName } );
		}
	} );

	this.metaList = null;
};
