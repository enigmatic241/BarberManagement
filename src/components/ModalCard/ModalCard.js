import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import elementResizeDetectorMaker from 'element-resize-detector'
import React, { Component } from 'react'
import { Typography } from '@material-ui/core'


const styles = theme => {
    console.log(theme)
    return {
        root: {
            flex: 1,
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            overscrollBehavior: 'none',
        },
        container: {
            maxHeight: '100%',
        },
        primary: {
            borderTop: `5px solid ${theme.palette.primary.main} !important`,
            boxShadow: 'none !important',
            borderRadius: '0 !important',
        },
        secondary: {
            borderTop: `5px solid ${theme.palette.secondary.main} !important`,
            boxShadow: 'none !important',
            borderRadius: '0 !important',
        },
        paper: {
            backgroundColor: '#FFF',
            borderRadius: theme.borderRadius,
            boxShadow: theme.shadows[1],
        },
        flat: {
            border: theme.border,
            boxShadow: theme.shadows[0],
        },
        headerWrapper: {
            display: 'flex',
            marginBottom: 0,
            flexShrink: 0,
            color: theme.typography.color,
            borderTopRightRadius: theme.borderRadius,
            borderTopLeftRadius: theme.borderRadius,
        },
        detached: {
            '& $leftWrapper': {
                marginLeft: 0,
                marginRight: theme.pad?.sm,
            },

            '& $rightWrapper': {
                marginRight: 0,
            },

            '& $textWrapper': {
                paddingLeft: 0,
            },

            '& $footerWrapper': {
                paddingLeft: 0,
                paddingRight: 0,
            },
        },
        divider: {
            borderBottom: theme.border,
        },
        textWrapper: {
            margin: ['auto', 0],
            padding: [theme.pad?.xs, theme.pad?.sm],
            flexGrow: 1,
            ...theme.overflowEllipsis,
        },
        rightWrapper: {
            marginLeft: 'auto',
            marginRight: theme.pad?.sm,
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            color: theme.typography.colorLight,
        },
        leftWrapper: {
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            marginLeft: theme.pad?.sm,
            color: theme.typography.colorLight,
        },
        marginBottom: {
            marginBottom: theme.pad?.sm,

            [theme.breakpoints.down('sm')]: {
                marginBottom: theme.pad?.xs,
            },
        },
        marginTop: {
            marginTop: theme.pad?.sm,

            [theme.breakpoints.down('sm')]: {
                marginTop: theme.pad?.xs,
            },
        },
        contentPad: {
            padding: theme.pad?.sm,

            [theme.breakpoints.down('xs')]: {
                padding: theme.pad?.xs,
            },
        },
        contentWrapper: {
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 'auto',
        },
        title: {
            ...theme.overflowEllipsis,
            color: 'inherit',
        },
        primaryHeader: {
            backgroundColor: theme.palette.primary.medium,
            color: theme.palette.primary.contrastText,

            '& > *': {
                color: theme.palette.primary.contrastText,
            },

            '& $subtitle': {
                color: theme.palette.primary.contrastText,
            },
            '& $rightWrapper': {
                color: theme.palette.primary.contrastText,
            },
            '& $leftWrapper': {
                color: theme.palette.primary.contrastText,
            },
        },
        subtitle: {
            whiteSpace: 'normal',
        },
        footerWrapper: {
            display: 'flex',
            marginBottom: 0,
            flexShrink: 0,
            color: theme.typography.color,
            padding: [theme.pad?.xs, theme.pad?.sm],
            overscrollBehavior: 'none',
        },
        footerLeftWrapper: {
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
        },
        footerRightWrapper: {
            marginLeft: 'auto',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
        },
        footerDivider: {
            borderTop: theme.border,
        },
        scrollable: {
            WebkitOverflowScrolling: 'touch',
            overflowY: 'auto',
        },
        headerBorderRight: {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderRight: theme.border,
        },
        contentBorderRight: {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderRight: theme.border,
        },
    }
}

class ModalCard extends Component {

    state = {
        height: 0,
    }

    componentDidMount() {
        if (!this.props.scrollable) return
        this.erd = elementResizeDetectorMaker({
            strategy: 'scroll',
        })
        this.erd.listenTo(this.el, this.handleResize)
    }

    componentWillUnmount() {
        if (!this.props.scrollable) return
        this.erd.uninstall(this.el)
    }

    handleRef = element => {
        this.el = element
    }

    handleResize = el => {
        const height = el.offsetHeight

        if (height === this.state.height) return

        this.setState({
            height,
        })
    }

    get height() {
        const containerHeight = this.state.height

        if (!containerHeight) return 'auto'
        const footerHeight = this.footer ? this.footer.offsetHeight : 0
        const headerHeight = this.header ? this.header.offsetHeight : 0
        return containerHeight - footerHeight - headerHeight
    }

    render() {
        const {
            classes,
            variant: _variant,
            title,
            right,
            subtitle,
            left,
            primaryHeader,
            children,
            divider,
            marginBottom,
            marginTop,
            contentPad,
            className,
            footerLeft,
            footerRight,
            headerVariant,
            scrollable,
            color,
            contentBorderRight,
            headerBorderRight,
            id,
            ...rest
        } = this.props

        const headerInCard =
            headerVariant === 'attached' || headerVariant === 'primaryAttached'

        const variant = color ? color : _variant

        return (
            <div
                className={cx(classes.root, className, {
                    [classes.marginBottom]: marginBottom,
                    [classes.marginTop]: marginTop,
                    [classes.paper]: headerInCard,
                    [classes.flat]: variant === 'flat' && headerInCard,
                    [classes.detached]: headerVariant === 'detached',
                    [classes.primary]: variant === 'primary',
                    [classes.secondary]: variant === 'secondary',
                    [classes.container]: scrollable,
                })}
                ref={this.handleRef}
                {...rest}
            >
                {(title || subtitle || left || right) && (
                    <div
                        className={cx(classes.headerWrapper, {
                            [classes.divider]: divider && headerInCard,
                            [classes.primaryHeader]:
                                primaryHeader || headerVariant === 'primaryAttached',
                            [classes.marginTop]: marginTop && !headerInCard,
                            [classes.headerBorderRight]: headerBorderRight,
                        })}
                        ref={el => (this.header = el)}
                    >
                        {left && <div className={classes.leftWrapper}>{left}</div>}
                        <div className={classes.textWrapper}>
                            {title && (
                                <Typography
                                    variant={'h5'}
                                    className={classes.title}
                                    id={id ? id + '_title' : null}
                                >
                                    {title}
                                </Typography>
                            )}
                            {subtitle && (
                                <Typography
                                    variant={'caption'}
                                    className={classes.subtitle}
                                    id={id ? id + '_subtitle' : null}
                                >
                                    {subtitle}
                                </Typography>
                            )}
                        </div>
                        {right && <div className={classes.rightWrapper}>{right}</div>}
                    </div>
                )}
                <div
                    className={cx(classes.contentWrapper, {
                        [classes.contentPad]: contentPad,
                        [classes.paper]: !headerInCard,
                        [classes.flat]: variant === 'flat' && !headerInCard,
                        [classes.scrollable]: scrollable,
                        [classes.contentBorderRight]: contentBorderRight,
                    })}
                    style={
                        scrollable
                            ? {
                                height: this.height,
                            }
                            : undefined
                    }
                >
                    {children}
                </div>
                {(footerLeft || footerRight) && (
                    <div
                        ref={el => (this.footer = el)}
                        className={cx(classes.footerWrapper, {
                            [classes.footerDivider]: divider,
                            [classes.primaryHeader]:
                                primaryHeader || headerVariant === 'primaryAttached',
                        })}
                    >
                        {footerLeft && (
                            <div className={classes.footerLeftWrapper}>{footerLeft}</div>
                        )}
                        {footerRight && (
                            <div className={classes.footerRightWrapper}>{footerRight}</div>
                        )}
                    </div>
                )}
            </div>
        )
    }
}

export default withStyles(styles)(ModalCard)